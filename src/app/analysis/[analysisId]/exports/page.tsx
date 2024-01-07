import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import ExportTable from "@/components/ExportTable";


export default async function AnalysisPage(props: {
  params: {
    analysisId: string
  }
}) {
  const analysis = await getAnalysis(props.params.analysisId);
  return <>
    <ExportTable data={analysis.exports}></ExportTable>
  </>;
}
