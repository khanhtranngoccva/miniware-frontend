import * as React from 'react';
import {flexRender, Table} from "@tanstack/react-table";

function HorizontalTable<T>(props: {
  table: Table<T>
}) {
  const nodes: React.ReactNode[][] = [];
  const {table} = props;

  table.getLeafHeaders().forEach((header, index) => {
    nodes[index] ??= [];
    nodes[index].push(<th key={header.id} className={"p-1 px-2 border-border-1 border-b-[1px] border-r-[1px]"}>
      {header.isPlaceholder
        ? null
        : flexRender(
          header.column.columnDef.header,
          header.getContext()
        )}
    </th>);
  });

  table.getRowModel().rows.forEach(row => {
    row.getVisibleCells().forEach((cell, index) => {
      nodes[index] ??= [];
      const Component = index === 0 ? "th" : "td";
      nodes[index].push(<Component key={cell.id}
                                   className={"p-1 px-2 border-border-1 border-b-[1px] border-r-[1px] overflow-hidden  max-w-2xl"}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Component>);
    });
  });

  return <div className={"absolute w-full h-full overflow-auto"}>
    <table>
      <thead>
      <tr className={"sticky w-full top-0 bg-background-3"}>
        {nodes[0]}
      </tr>
      </thead>
      <tbody>
      {nodes.slice(1).map((row, index) => {
        return <tr key={index}>
          {row}
        </tr>;
      })}
      </tbody>
    </table>
  </div>;
}

export default HorizontalTable;
