import React from "react";
import AnalysisSidebar from "@/components/AnalysisSidebar";
import {getAnalysis} from "@/helpers/analysis";
import AnalysisInteractor from "@/components/AnalysisInteractor";

export default async function AnalysisLayout(props: {
  children?: React.ReactNode,
  params: {
    analysisId: string;
  }
}) {
  const {analysisId} = props.params;
  const analysis = await getAnalysis(analysisId);

  return <>
    <AnalysisSidebar analysisId={analysisId}/>
    <AnalysisInteractor analysisId={analysis.id} filename={analysis.filename}></AnalysisInteractor>
    <div className={"h-full bg-background-2 flex-1 flex relative"}>
      {props.children}
    </div>
  </>;
}
