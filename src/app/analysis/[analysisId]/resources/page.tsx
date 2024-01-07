import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import SectionTable from "@/components/SectionTable";
import ResourceTable from "@/components/ResourceTable";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <ResourceTable data={analysis.resources}></ResourceTable>
    </>;
}
