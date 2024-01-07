"use client";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import * as React from 'react';
import {hexify} from "@/helpers/strings";
import HorizontalTable from "@/components/HorizontalTable";
import VerticalTable from "@/components/VerticalTable";

function useTable(data: Application.String[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Application.String>();
    const columns: ColumnDef<Application.String>[] = [
      columnHelper.accessor("data", {
        header: "String",
        size: 400,
        cell(props) {
          return <span className={"font-mono overflow-hidden"}>{props.getValue()}</span>;
        }
      }),
      columnHelper.accessor("score", {
        header: "Score",
        size: 75,
        cell(props) {
          return <span>{props.getValue()}</span>;
        }
      }),
      columnHelper.accessor("tags", {
        header: "Tags",
        cell(props) {
          return props.getValue().map(tag => tag.tag).join(', ');
        }
      })
    ];
    return columns;
  }, []);

  return useReactTable<Application.String>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
