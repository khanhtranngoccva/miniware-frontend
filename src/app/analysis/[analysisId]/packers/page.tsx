import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import PackerTable from "@/components/PackerTable";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <PackerTable data={analysis.packers}></PackerTable>
    </>;
}
