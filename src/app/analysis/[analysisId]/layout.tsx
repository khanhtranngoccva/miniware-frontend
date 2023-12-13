import React from "react";
import SidebarLink from "@/components/SidebarLink";
import AnalysisSidebar from "@/components/AnalysisSidebar";

export default function AnalysisLayout(props: {
  children?: React.ReactNode,
  params: {
    analysisId: string;
  }
}) {
  const {analysisId} = props.params;

  return <>
    <AnalysisSidebar analysisId={analysisId}/>
    <div className={"h-full bg-background-2 flex-1"}>
      {props.children}
    </div>
  </>;
}
