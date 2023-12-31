"use client";
import {
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import * as React from 'react';
import VerticalTable from "@/components/VerticalTable";
import {hexify} from "@/helpers/strings";
import {useReactTable} from "@/hooks/useReactTable";

type ProcessedResource = Omit<Application.Resource, "hashes"> & {
  hashes: Record<string, string>
}

function useTable(data: Application.Resource[]) {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<ProcessedResource>();
    const columns: ColumnDef<ProcessedResource>[] = [
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("type", {
        header: "Type",
      }),
      columnHelper.accessor("local_id", {
        header: "ID",
      }),
      columnHelper.accessor("primary_language", {
        header: "Primary language",
      }),
      columnHelper.accessor("sub_language", {
        header: "Sub-language",
      }),
      columnHelper.accessor("offset", {
        header: "Offset",
        cell: props => {
          return hexify(props.getValue());
        }
      }),
      columnHelper.accessor("size", {
        header: "Size",
      }),
    ] as ColumnDef<ProcessedResource>[];

    const algorithms = new Set<string>();
    for (let resource of data) {
      for (let hash of resource.hashes) {
        algorithms.add(hash.algorithm);
      }
    }

    for (let algorithm of Array.from(algorithms)) {
      columns.push(columnHelper.accessor(`hashes.${algorithm}`, {
        header: algorithm.toUpperCase()
      }) as ColumnDef<ProcessedResource>);
    }

    return columns;
  }, [data]);

  const processedResources = React.useMemo(() => {
    const processedResources: ProcessedResource[] = [];
    for (let resource of data) {
      const hashObject: Record<string, string> = {};
      for (let hash of resource.hashes) {
        hashObject[hash.algorithm] = hash.value;
      }
      processedResources.push({
        ...resource,
        hashes: hashObject
      });
    }
    return processedResources;
  }, [data]);

  return useReactTable<ProcessedResource>({
    data: processedResources,
    columns,
  });
}


function ResourceTable(props: {
  data: Application.Resource[]
}) {
  const {data} = props;
  const table = useTable(data);
  return <VerticalTable table={table}></VerticalTable>;
}


export default ResourceTable;
