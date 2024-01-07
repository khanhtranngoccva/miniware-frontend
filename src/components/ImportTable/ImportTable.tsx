"use client";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import * as React from 'react';
import VerticalTable from "@/components/VerticalTable";
import {hexify} from "@/helpers/strings";

function useTable(data: Application.Import[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Application.Import>();
    const columns: ColumnDef<Application.Import, any>[] = [
      columnHelper.accessor("name", {
        header: "Name",
        size: 400,
      }),
      columnHelper.accessor("address", {
        header: "Address",

        cell: props => {
          return hexify(props.getValue())
        }
      }),
    ];
    return columns;
  }, []);

  return useReactTable<Application.Import>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}


function ImportTable(props: {
  data: Application.Import[]
}) {
  const {data} = props;
  const table = useTable(data);
  return <VerticalTable table={table}></VerticalTable>;
}


export default ImportTable;
