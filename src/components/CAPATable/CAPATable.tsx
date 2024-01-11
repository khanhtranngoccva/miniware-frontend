"use client";
import * as React from 'react';
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {useReactTable} from "@/hooks/useReactTable";
import MultiKeyMap from "@/helpers/dataStructures/multiKeyMap";
import {capitalize, hexify} from "@/helpers/strings";
import VerticalTable from "@/components/VerticalTable";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {MdCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";

interface CAPARow {
  reactKey: string,
  indentation: number,
  data: {
    success: boolean | null,
    node: string | null,
    location: {
      type: string,
      value: number | null,
    } | null,
    namespace: string | null,
  },
  toggled: boolean,

  onToggle(): void,
}

function useTable(data: CAPARow[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<CAPARow>();
    const columns: ColumnDef<CAPARow>[] = [
      columnHelper.accessor("data.success", {
        enableSorting: false,
        enableResizing: false,
        size: 40,
        header: "",
        cell: (props) => {
          return <div className={"w-full h-full flex items-center justify-center"}>
            {props.getValue() ? <MdCheckBox></MdCheckBox> :
              <MdOutlineCheckBoxOutlineBlank></MdOutlineCheckBoxOutlineBlank>}
          </div>;
        }
      }),
      columnHelper.accessor("data.node", {
        enableSorting: false,
        minSize: 500,
        header: "Node",
        cell: (props) => {
          const original = props.row.original;
          return <IndentedCell indentation={original.indentation}
                               toggled={original.toggled}
                               onToggle={original.onToggle}>{props.getValue()?.toString()}</IndentedCell>;
        }
      }),
      columnHelper.accessor("data.location", {
        enableSorting: false,
        minSize: 300,
        header: "Location",
        cell: (props) => {
          const data = props.getValue();
          if (!data) return null;
          const type = capitalize(data.type);
          return data.value !== null
              ? <>{type} @ {hexify(data.value)}</>
              : type;
        }
      }),
      columnHelper.accessor("data.namespace", {
        enableSorting: false,
        minSize: 300,
        header: "Namespace",
        cell: (props) => {
          return props.getValue();
        }
      }),
    ] as ColumnDef<CAPARow>[];
    return columns;
  }, []);

  return useReactTable({
    data,
    columns,
  });
}

function IndentedCell(props: {
  children?: React.ReactNode,
  toggled: boolean,
  indentation: number,
  onToggle(): void,
}) {
  const Component = props.toggled ? IoIosArrowDown : IoIosArrowForward;
  return <div className={"flex font-mono w-full h-full gap-2 items-center"}>
    <div className={"h-full flex-none"} style={{
      width: `${2 * props.indentation ?? 0}ch`,
    }}></div>
    <button onClick={() => {
      props.onToggle();
    }} className={"w-4"}>
      <Component/>
    </button>
    {props.children}
  </div>;
}

// Example: Path is [1, 2, 3, 4, 5]. Required: [1], [1, 2], [1, 2, 3], [1, 2, 3, 4] to be shown.
function checkIfPathToBeShown(map: MultiKeyMap<number, boolean>, path: number[]) {
  for (let i = 1; i < path.length; i++) {
    let slice = path.slice(0, i);
    if (!map.get(slice)) return false;
  }
  return true;
}

function sortPaths(path1: number[], path2: number[]) {
  const maxLength = Math.max(path1.length, path2.length);
  for (let i = 0; i < maxLength; i++) {
    const part1 = path1[i];
    const part2 = path2[i];
    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
    if (part1 === undefined && part2 !== undefined) return -1;
    if (part2 === undefined && part1 !== undefined) return 1;
  }
  return 0;
}

function useUpdate(): [number, () => void] {
  const [updateCount, setUpdateCount] = React.useState(0);

  const update = React.useCallback(() => {
    setUpdateCount(c => {
      return c + 1;
    });
  }, []);

  return [updateCount, update];
}

function CAPATable(props: {
  data: Application.CAPAEntry[]
}) {
  const capaRawData = props.data;
  const [updateCount, update] = useUpdate();
  const toggleStateRef = React.useRef(new MultiKeyMap<number, boolean>(false));
  const toggle = React.useCallback((path: number[]) => {
    const toggleState = toggleStateRef.current;
    toggleState.set(path, !toggleState.get(path));
    update();
  }, []);
  const data: CAPARow[] = React.useMemo(() => {
    const result: CAPARow[] = [];
    const innerToggleState = toggleStateRef.current;
    for (let entry of capaRawData) {
      const entryId = entry.id;
      const path = [entryId];
      result.push({
        reactKey: path.join("."),
        indentation: 0,
        data: {
          success: true,
          node: entry.rule_name,
          location: null,
          namespace: entry.rule_namespace
        },
        toggled: innerToggleState.get(path),
        onToggle: () => toggle(path),
      });
      for (let match of entry.matches) {
        const matchId = match.id;
        const path = [entryId, matchId];
        if (checkIfPathToBeShown(innerToggleState, path)) {
          result.push({
            reactKey: path.join("."),
            data: {
              success: true,
              namespace: null,
              location: {
                type: match.location_type,
                value: match.location_value,
              },
              node: entry.rule_scope,
            },
            indentation: path.length - 1,
            toggled: innerToggleState.get(path),
            onToggle: () => toggle(path),
          });
        }
        const nodes: CAPARow[] = match.nodes.map(original => {
          return {
            ...original,
            numericPath: original.path.split(".").map(d => +d),
          };
        }).sort((n1, n2) => {
          return sortPaths(n1.numericPath, n2.numericPath);
        }).map(sortedNode => {
          const path = [entryId, matchId, ...sortedNode.numericPath];
          let displayString: string;
          if (sortedNode.type === "feature") {
            displayString = `Feature ${sortedNode.subtype}: ${sortedNode.feature_data}`;
          } else {
            displayString = `${sortedNode.subtype}`;
          }
          if (checkIfPathToBeShown(innerToggleState, path)) {
            return {
              reactKey: path.join("."),
              data: {
                success: sortedNode.success,
                namespace: null,
                location: sortedNode.locations[0] ?? null,
                node: displayString,
              },
              indentation: path.length - 1,
              toggled: innerToggleState.get(path),
              onToggle: () => toggle(path),
            };
          } else {
            return undefined;
          }
        }).filter(Boolean) as CAPARow[];
        result.push(...nodes);
      }
    }
    return result;
  }, [toggle, capaRawData, updateCount]);
  const table = useTable(data);

  return <div className={"font-mono text-sm w-full h-full"}>
    <VerticalTable table={table}></VerticalTable>
  </div>;
}

export default CAPATable;
