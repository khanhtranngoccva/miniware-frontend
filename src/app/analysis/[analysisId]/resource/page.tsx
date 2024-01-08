import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import KeyValueTable, {KeyValuePair} from "@/components/KeyValueTable";
import { Resource } from "@/types";

export default async function  AnalysisPage(props: {
  params: {
    analysisId: string
  }
}) {
  const analysis = await getAnalysis(props.params.analysisId);



  const resource: Resource = analysis.resources;

  const data: KeyValuePair[] = [
      ["ID", resource.id],
      ["Analysis ID", resource.analysis_id],
      ["Local ID", resource.local_id],
      ["Name", resource.name],
      ["Primary Language", resource.primary_language],
      ["Sub Language", resource.sub_language],
      ["Type", resource.type],
      ["Offset", resource.offset],
      ["Size", resource.size],
  ];

  return <>
    <KeyValueTable data={data}></KeyValueTable>
  </>;
}
