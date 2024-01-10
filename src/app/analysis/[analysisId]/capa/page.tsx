import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import TestComponent from "@/components/TestComponent";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <TestComponent data={analysis.capa}></TestComponent>
    </>;
}
