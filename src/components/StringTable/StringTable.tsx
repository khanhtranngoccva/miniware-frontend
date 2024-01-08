"use client";
import {
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import * as React from 'react';
import {hexify} from "@/helpers/strings";
import HorizontalTable from "@/components/HorizontalTable";
import VerticalTable from "@/components/VerticalTable";
import {useReactTable} from "@/hooks/useReactTable";
import Tag from "@/components/Tag";
import StringCell from "@/components/StringCell";

function useTable(data: Application.String[]) {
  const columns = React.useMemo(() => {
    console.log("Should not be re-rendering");
    const columnHelper = createColumnHelper<Application.String>();
    const columns: ColumnDef<Application.String>[] = [
      columnHelper.accessor("data", {
        header: "String",
        size: 400,
        enableResizing: true,
        cell(props) {
          return <StringCell {...props.row.original} key={props.cell.id}></StringCell>;
        }
      }),
      columnHelper.accessor("score", {
        header: "Score",
        size: 75,
        enableResizing: true,
        cell(props) {
          return <span>{props.getValue()}</span>;
        }
      }),
      columnHelper.accessor("tags", {
        header: "Tags",
        enableResizing: true,
        size: 300,
        cell(props) {
          return <ul className={"flex items-center gap-2"}>
            {props.getValue().map(tag => {
              return <Tag tag={tag.tag} key={tag.id}></Tag>
            })}
          </ul>;
        }
      })
    ] as ColumnDef<Application.String>[];
    return columns;
  }, []);

  return useReactTable<Application.String>({
    data,
    columns,
  });
}


function StringTable(props: {
  data: Application.String[]
}) {
  const {data} = props;
  const table = useTable(data);

  return <VerticalTable table={table}></VerticalTable>;
}


export default StringTable;
