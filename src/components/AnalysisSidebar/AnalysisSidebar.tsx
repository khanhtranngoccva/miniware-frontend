import * as React from 'react';
import SidebarLink from "@/components/SidebarLink";

function AnalysisSidebar(props: {
  analysisId: string
}) {
  return <div className={"flex flex-none min-w-fit flex-col bg-white py-2 border-r-[1px] border-r-border-1"}>
    <SidebarLink href={`/analysis/${props.analysisId}/`}>Basic information</SidebarLink>
    {/*<SidebarLink href={`/analysis/${props.analysisId}/packer`}>Packer detection</SidebarLink>*/}
    {/*<SidebarLink href={`/analysis/${props.analysisId}/dos-header`}>DOS header</SidebarLink>*/}
    <SidebarLink href={`/analysis/${props.analysisId}/file-header`}>File header</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/optional-header`}>Optional header</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/imports`}>Imports</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/exports`}>Exports</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/sections`}>Sections</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/resources`}>Resources</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/strings`}>Strings</SidebarLink>
    <SidebarLink href={`/analysis/${props.analysisId}/capa`}>Functionalities</SidebarLink>
  </div>;
}

export default AnalysisSidebar;
