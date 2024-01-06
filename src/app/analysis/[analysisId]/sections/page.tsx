import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import SectionTable from "@/components/SectionTable";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <SectionTable data={analysis.sections}></SectionTable>
    </>;
}
