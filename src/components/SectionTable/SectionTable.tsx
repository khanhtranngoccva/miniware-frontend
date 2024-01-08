"use client";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel, getSortedRowModel, SortingState,
  useReactTable
} from "@tanstack/react-table";
import * as React from 'react';
import {hexify} from "@/helpers/strings";
import HorizontalTable from "@/components/HorizontalTable";
import VerticalTable from "@/components/VerticalTable";

type ProcessedSection = (Omit<Application.Section, "hashes"> & {
  hashes: Record<string, string>
});

function useTable(data: Application.Section[]) {
  const processedSections: ProcessedSection[] = React.useMemo(() => {
    return data.map(e => {
      const objHashes: Record<string, string> = {};
      for (let hash of e.hashes) {
        objHashes[hash.algorithm] = hash.value;
      }
      return {
        ...e,
        hashes: objHashes
      };
    });
  }, [data]);
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<ProcessedSection>();
    const columns: ColumnDef<ProcessedSection>[] = [
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("entropy", {
        header: "Entropy",
      }),
      columnHelper.accessor("raw_size", {
        header: "Raw size",
      }),
      columnHelper.accessor("raw_address", {
        header: "Raw address",
        cell: (props) => {
          return hexify(props.getValue());
        }
      }),
      columnHelper.accessor("virtual_address", {
        header: "Virtual address",
        cell: (props) => {
          return hexify(props.getValue());
        }
      }),
      columnHelper.accessor("virtual_size", {
        header: "Virtual size",
      }),
      columnHelper.accessor("characteristics.readable", {
        header: "Readable",
      }),
      columnHelper.accessor("characteristics.shareable", {
        header: "Shareable",
      }),
      columnHelper.accessor("characteristics.writeable", {
        header: "Writeable",
      }),
      columnHelper.accessor("characteristics.cacheable", {
        header: "Cacheable",
      }),
      columnHelper.accessor("characteristics.discardable", {
        header: "Discardable",
      }),
      columnHelper.accessor("characteristics.executable", {
        header: "Executable",
      }),
      columnHelper.accessor("characteristics.pageable", {
        header: "Pageable",
      }),
      columnHelper.accessor("characteristics.has_executable_code", {
        header: "Has executable code",
      }),
      columnHelper.accessor("characteristics.contains_extended_relocations", {
        header: "Contains extended relocations",
      }),
      columnHelper.accessor("characteristics.has_global_pointer_data", {
        header: "Has global pointer data",
      }),
      columnHelper.accessor("characteristics.has_initialized_data", {
        header: "Has initialized data",
      }),
      columnHelper.accessor("characteristics.has_uninitialized_data", {
        header: "Has uninitialized data",
      }),
      columnHelper.accessor("characteristics.memory_16bit", {
        header: "16 bit section in memory",
      }),
      columnHelper.accessor("characteristics.memory_locked", {
        header: "Memory locked",
      }),
      columnHelper.accessor("characteristics.memory_preload", {
        header: "Memory preload",
      }),
      columnHelper.accessor("characteristics.memory_purgeable", {
        header: "Memory purgeable",
      }),
      columnHelper.accessor("characteristics.object_file_alignment_bytes", {
        header: "Object file alignment in bytes",
      }),
      columnHelper.accessor("characteristics.object_file_pad_to_next_boundary", {
        header: "Object file pad to next boundary",
      }),
      columnHelper.accessor("characteristics.object_file_section_contains_info", {
        header: "Object file contains information",
      }),
      columnHelper.accessor("characteristics.object_file_section_includes_comdat", {
        header: "Object file contains COMDAT data",
      }),
      columnHelper.accessor("characteristics.object_file_section_to_remove_from_image", {
        header: "Object file section to remove from image",
      }),
    ] as ColumnDef<ProcessedSection>[];
    const hashSet = new Set<string>();
    for (let section of data) {
      const hashes = section.hashes;
      hashes.forEach(hash => {
        hashSet.add(hash.algorithm);
      });
    }
    for (let algorithm of Array.from(hashSet).reverse()) {
      columns.splice(2, 0, columnHelper.accessor(`hashes.${algorithm}`, {
        header: algorithm.toUpperCase(),
        cell(props) {
          return props.getValue()?.toString();
        }
      }) as ColumnDef<ProcessedSection>);
    }
    const stringify: typeof columns["0"]["cell"] = function (props) {
      return props.getValue()?.toString();
    };
    for (let column of columns) {
      if (!column.cell) column.cell = stringify;
    }
    return columns;
  }, [data]);

  return useReactTable<ProcessedSection>({
    data: processedSections,
    columnResizeMode: "onChange",
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}


function SectionTable(props: {
  data: Application.Section[]
}) {
  const {data} = props;
  const table = useTable(data);
  return <VerticalTable table={table}></VerticalTable>;
}


export default SectionTable;
