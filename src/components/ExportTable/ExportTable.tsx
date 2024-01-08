"use client";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import * as React from 'react';
import VerticalTable from "@/components/VerticalTable";
import {hexify} from "@/helpers/strings";
import {useReactTable} from "@/hooks/useReactTable";

function useTable(data: Application.Export[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Application.Export>();
    const columns: ColumnDef<Application.Export>[] = [
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
    ] as ColumnDef<Application.Export>[];
    return columns;
  }, []);

  return useReactTable<Application.Export>({
    data,
    columns,
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
