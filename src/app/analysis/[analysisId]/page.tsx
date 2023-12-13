import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import KeyValueTable, {KeyValuePair} from "../../../components/KeyValueTable";

export default async function AnalysisPage(props: {
  params: {
    analysisId: string
  }
}) {
  const analysis = await getAnalysis(props.params.analysisId);
  const data: KeyValuePair[] = [
    ["Entropy", analysis.basic_information.entropy],
    ["Import Hash", analysis.basic_information.imphash],
    ["Company", analysis.basic_information.company],
    ["Description", analysis.basic_information.description],
    ["Version", analysis.basic_information.version],
    ["Internal Name", analysis.basic_information.internal_name],
    ["Copyright", analysis.basic_information.copyright],
    ["Original Filename", analysis.basic_information.original_filename],
    ["Product Name", analysis.basic_information.product_name],
    ["Product Version", analysis.basic_information.product_version],
    ["Language ID", analysis.basic_information.language_id],
  ];
  return <>
    <KeyValueTable data={data}></KeyValueTable>
  </>;
}
