"use client";
import * as React from 'react';
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {useReactTable} from "@/hooks/useReactTable";
import {useImmer} from "use-immer";
import MultiKeyMap from "@/helpers/dataStructures/multiKeyMap";
import {capitalize, hexify} from "@/helpers/strings";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";
import VerticalTable from "@/components/VerticalTable";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";

interface CAPARow {
  reactKey: string,
  indentation: number,
  data: [boolean | null, string | null, string | null],
  shown: boolean,
  toggled: boolean,
  onToggle(): void,
}

function useTable(data: CAPARow[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<CAPARow>();
    const columns: ColumnDef<CAPARow>[] = [
      columnHelper.accessor("data.0" as any, {
        enableSorting: false,
        enableResizing: false,
        size: 40,
        header: "",
        cell: (props) => {
          return props.getValue();
        }
      }),
      columnHelper.accessor("data.1" as any, {
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
      columnHelper.accessor("data.2" as any, {
        enableSorting: false,
        header: "Extra information",
        cell: (props) => {
          return props.getValue();
        }
      }),
    ];
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
  const Component = props.toggled ? IoIosArrowDown : IoIosArrowUp;

  return <div className={"flex font-mono gap-2"}>
    <div className={"h-full flex-none"} style={{
      width: `${2 * props.indentation ?? 0}ch`,
    }}></div>
    <button onClick={props.onToggle} className={"w-4"}>
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

function TestComponent(props: {
  data: Application.CAPAEntry[]
}) {
  const capaRawData = props.data;
  const [toggleState, setToggleState] = useState({
    toggleState: new MultiKeyMap<number, boolean>(true),
  });
  const toggle = React.useCallback((path: number[]) => {
    setToggleState(({toggleState}) => {
      toggleState.set(path, !toggleState.get(path));
      return {toggleState};
    });
  }, [setToggleState]);

  const data: CAPARow[] = React.useMemo(() => {
    const result: CAPARow[] = [];
    const innerToggleState = toggleState.toggleState;

    for (let entry of capaRawData) {
      const entryId = entry.id;
      const path = [entryId];
      result.push({
        reactKey: path.join("."),
        shown: true,
        indentation: 0,
        data: [true, entry.rule_name, entry.rule_namespace],
        toggled: innerToggleState.get(path),
        onToggle: () => toggle(path),
      });
      for (let match of entry.matches) {
        const matchId = match.id;
        const path = [entryId, matchId];
        result.push({
          reactKey: path.join("."),
          shown: checkIfPathToBeShown(innerToggleState, path),
          data: [true, `${entry.rule_scope} @ ${hexify(match.location_value)}`, `${capitalize(match.location_type)} location`],
          indentation: path.length - 1,
          toggled: innerToggleState.get(path),
          onToggle: () => toggle(path),
        });
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
          let location: string | null = null;
          if (sortedNode.type === "feature") {
            displayString = `Feature ${sortedNode.subtype}: ${sortedNode.feature_data}`;
            if (sortedNode.locations[0]) {
              location = `@ ${hexify(sortedNode.locations[0]?.value)}`;
            }
          } else {
            displayString = `${sortedNode.subtype}`;
          }
          return {
            reactKey: path.join("."),
            data: [sortedNode.success, displayString, location],
            shown: checkIfPathToBeShown(innerToggleState, path),
            indentation: path.length - 1,
            toggled: innerToggleState.get(path),
            onToggle: () => toggle(path),
          };
        });
        result.push(...nodes);
      }
    }

    console.log(innerToggleState);

    return result;
  }, [toggle, capaRawData, toggleState]);
  const table = useTable(data);

  return <div className={"font-mono text-sm w-full h-full"}>
    <VerticalTable table={table}></VerticalTable>
  </div>;
}

export default TestComponent;
