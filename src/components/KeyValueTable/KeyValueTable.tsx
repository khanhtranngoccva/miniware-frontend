"use client";
import {ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import * as React from 'react';

export type KeyValuePair = [string, string | number];

const columnHelper = createColumnHelper<KeyValuePair>();
const columns: ColumnDef<KeyValuePair>[] = [
  columnHelper.accessor("0" as any, {
    id: "key",
    header: "",
    cell: props => {
      return props.getValue();
    }
  }),
  columnHelper.accessor("1" as any, {
    id: "value",
    header: "Value",
    cell: props => {
      return props.getValue();
    }
  }),
];


function KeyValueTable(props: {
  data: KeyValuePair[]
}) {
  const {data} = props;

  const table = useReactTable<KeyValuePair>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return <div>
    <table>
      <thead>
      {
        table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className={"px-2 py-1 border-border-1 border-[1px]"}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))
      }
      </thead>
      <tbody>
      {table.getRowModel().rows.map(row => {
        return <tr key={row.id}>
          {row.getVisibleCells().map(cell => {
            return <td key={cell.id} className={"px-2 py-1 border-border-1 border-[1px]"}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>;
          })}
        </tr>;
      })}
      </tbody>
    </table>
  </div>;
}


export default KeyValueTable;
