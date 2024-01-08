import {TableOptions} from "@tanstack/table-core";
import {getCoreRowModel, getSortedRowModel, useReactTable as _useReactTable} from "@tanstack/react-table";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export function useReactTable<T>(params: PartialBy<TableOptions<T>, "getSortedRowModel" | "getCoreRowModel">) {
  const parsed: TableOptions<T> = {
    columnResizeMode: "onChange",
    enableSorting: true,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    ...params,
  };

  return _useReactTable(parsed);
}
