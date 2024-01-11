import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import SectionTable from "@/components/SectionTable";
import StringTable from "@/components/StringTable";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <StringTable data={analysis.strings}></StringTable>
    </>;
}
