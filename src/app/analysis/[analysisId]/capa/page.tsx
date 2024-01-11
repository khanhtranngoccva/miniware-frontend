import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import CAPATable from "../../../../components/CAPATable";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    return <>
        <CAPATable data={analysis.capa}></CAPATable>
    </>;
}
