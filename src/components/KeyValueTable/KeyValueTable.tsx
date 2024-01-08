"use client";
import {
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import * as React from 'react';
import VerticalTable from "@/components/VerticalTable";
import {useReactTable} from "@/hooks/useReactTable";

export type KeyValuePair = [string, string | number | boolean | null | undefined];

function useColumns(keyWidth?: number, valueWidth?: number) {
  return React.useMemo(() => {
    const columnHelper = createColumnHelper<KeyValuePair>();
    const columns: ColumnDef<KeyValuePair>[] = [
      columnHelper.accessor("0" as any, {
        id: "key",
        header: "",
        size: keyWidth,
        cell: props => {
          return props.getValue();
        }
      }),
      columnHelper.accessor("1" as any, {
        id: "value",
        header: "Value",
        size: valueWidth,
        cell: props => {
          return props.getValue()?.toString();
        }
      }),
    ];
    return columns;
  }, [keyWidth, valueWidth]);
}


function KeyValueTable(props: {
  data: KeyValuePair[]
  keyWidth?: number,
  valueWidth?: number,
}) {
  const {data} = props;
  const columns = useColumns(props.keyWidth, props.valueWidth);
  const table = useReactTable<KeyValuePair>({
    data,
    columns,
  });


  return <VerticalTable table={table}></VerticalTable>;
}


export default KeyValueTable;
