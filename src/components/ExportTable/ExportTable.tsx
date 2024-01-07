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

function useTable(data: Application.Export[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Application.Export>();
    const columns: ColumnDef<Application.Export, any>[] = [
      columnHelper.accessor("ordinal", {
        header: "Ordinal",
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("address", {
        header: "Address",
        cell: props => {
          return hexify(props.getValue());
        }
      }),
    ];
    return columns;
  }, []);

  return useReactTable<Application.Export>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}


function ExportTable(props: {
  data: Application.Export[]
}) {
  const {data} = props;
  const table = useTable(data);
  return <VerticalTable table={table}></VerticalTable>;
}


export default ExportTable;
