import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import KeyValueTable, {KeyValuePair} from "@/components/KeyValueTable";

export default async function  AnalysisPage(props: {
  params: {
    analysisId: string
  }
}) {
  const analysis = await getAnalysis(props.params.analysisId);
  console.log(analysis.file_header)
  const data: KeyValuePair[] = [
    ["Machine", analysis.file_header.machine],
    ["Compile Time", new Date(analysis.file_header.compiled_at).toUTCString()],
    ["Sections", analysis.file_header.sections],
    ["Pointer to symbol table", analysis.file_header.pointer_to_symbol_table],
    ["Number of symbols", analysis.file_header.number_of_symbols],
    ["Size of optional Header", analysis.file_header.size_of_optional_header.toString()+" Bytes"],
    ["Relocations Stripped", analysis.file_header.characteristics.relocation_stripped],
    ["Executable", analysis.file_header.characteristics.executable],
    ["COFF line number", analysis.file_header.characteristics.coff_line_numbers_stripped],
    ["COFF local symbol table stripped", analysis.file_header.characteristics.coff_local_symbol_table_stripped],
    ["Trim working set", analysis.file_header.characteristics.aggressive_trim_working_set],
    ["Large address aware", analysis.file_header.characteristics.large_address_aware],
    ["Little endian", analysis.file_header.characteristics.little_endian],
    ["Big endian", analysis.file_header.characteristics.big_endian],
    ["32bit", analysis.file_header.characteristics["32bit"]],
    ["Debug stripped", analysis.file_header.characteristics.debug_stripped],
    ["Load to swap if on removable media", analysis.file_header.characteristics.load_to_swap_if_on_removable_media],
    ["Load to swap if on network", analysis.file_header.characteristics.load_to_swap_if_on_network],
    ["System image", analysis.file_header.characteristics.system_image],
    ["Dynamic-link library (DLL)", analysis.file_header.characteristics.dynamic_link_library],
    ["Uniprocessor only", analysis.file_header.characteristics.uniprocessor_only],
  ];
  return <>
    <KeyValueTable data={data} valueWidth={400} keyWidth={400}></KeyValueTable>
  </>;
}
