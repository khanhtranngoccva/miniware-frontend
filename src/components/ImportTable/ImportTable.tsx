"use client";
import {ColumnDef, createColumnHelper,} from "@tanstack/react-table";
import * as React from 'react';
import VerticalTable from "@/components/VerticalTable";
import {hexify} from "@/helpers/strings";
import {useReactTable} from "@/hooks/useReactTable";

function useTable(data: Application.Import[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Application.Import>();
    return [
      columnHelper.accessor("name", {
        header: "Name",
        size: 400,
      }),
      columnHelper.accessor("address", {
        header: "Address",
        cell: props => {
          return hexify(props.getValue());
        }
      }),
    ] as ColumnDef<Application.Import>[];
  }, []);

  return useReactTable<Application.Import>({
    data,
    columns,
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
