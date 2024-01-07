import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import SectionTable from "@/components/SectionTable";
import ImportTable from "@/components/ImportTable";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <ImportTable data={analysis.imports}></ImportTable>
    </>;
}
