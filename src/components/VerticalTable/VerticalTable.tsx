import * as React from 'react';
import {Cell, flexRender, Table} from "@tanstack/react-table";
import {useVirtualizer} from "@tanstack/react-virtual";

function TableCell<T, U>(props: {
  cell: Cell<T, U>
}) {
  return <td
    key={props.cell.id}
    className={"flex overflow-shown p-1 px-2 items-center relative text-ellipsis border-border-1 border-b-[1px] border-r-[1px]"}
    style={{
      width: props.cell.column.getSize(),
    }}
  >
    <div className={"w-full h-full overflow-hidden text-ellipsis"} onClick={() => {
      const val = props.cell.getValue();
      if (val !== undefined && val !== null) {
        navigator.clipboard.writeText(val.toString()).then();
      }
    }}>
      {flexRender(
        props.cell.column.columnDef.cell,
        props.cell.getContext()
      )}
    </div>
  </td>;
}

function VerticalTable<T>(props: {
  table: Table<T>
}) {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const sizingContainerRef = React.useRef<HTMLDivElement>(null);
  const {table} = props;
  const {rows} = table.getRowModel();
  //The virtualizer needs to know the scrollable container element
  const rowVirtualizer = useVirtualizer({
    count: rows.length,

    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div className={"w-full h-full absolute"} ref={sizingContainerRef}>
      <div
        className="w-full"
        ref={tableContainerRef}
        style={{
          overflow: 'auto', //our scrollable table container
          position: 'relative', //needed for sticky header
          height: '100%', //should be a fixed height
        }}
      >
        <table className={"grid"}>
          <thead className={"grid sticky top-0 z-[1]"}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
              className={"flex w-full "}
            >
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    className={"flex p-1 px-2 border-border-1 border-b-[1px] border-r-[1px] bg-background-3 relative"}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.column.getCanResize() && <div
                        className={`absolute w-[4px] bg-[#0004] h-full hover:bg-[#0008] top-0 right-0 select-none ${header.column.getIsResizing() ? "cursor-grabbing" : "cursor-col-resize"}`}
                        onDoubleClick={() => header.column.resetSize()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}/>}
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
          </thead>
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: 'relative', //needed for absolute positioning of rows
            }}
          >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index];
            return (
              <tr
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                className={"flex absolute w-full"}
                style={{
                  transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                }}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <TableCell cell={cell} key={cell.id}></TableCell>
                  );
                })}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerticalTable;
