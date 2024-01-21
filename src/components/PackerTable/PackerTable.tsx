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

function useTable(data: Application.Packer[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Application.Packer>();
    const columns: ColumnDef<Application.Packer>[] = [
      columnHelper.accessor("signature", {
        header: "Signature",
        size: 400,
      }),
    ] as ColumnDef<Application.Packer>[];
    return columns;
  }, []);

  return useReactTable<Application.Packer>({
    data,
    columns,
  });
}


function PackerTable(props: {
  data: Application.Packer[]
}) {
  const {data} = props;
  const table = useTable(data);
  return <VerticalTable table={table}></VerticalTable>;
}


export default PackerTable;
