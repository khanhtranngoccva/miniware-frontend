import {getAnalysis} from "@/helpers/analysis";
import React from "react";
import KeyValueTable, {KeyValuePair} from "@/components/KeyValueTable";
import {hexify} from "@/helpers/strings";


export default async function AnalysisPage(props: {
    params: {
        analysisId: string
    }
}) {
    const analysis = await getAnalysis(props.params.analysisId);
    const exe_header = analysis.optional_header;
    const characteristics = exe_header.dll_characteristics;

    const data: KeyValuePair[] = [
        ["Magic", exe_header.magic],
        ["Linker version", `${exe_header.major_linker_version}.${exe_header.minor_linker_version}`],
        ["Size of code", `${exe_header.size_of_code} bytes`],
        ["Size of code", `${exe_header.size_of_initialized_data} bytes`],
        ["Size of uninitialized data", `${exe_header.size_of_uninitialized_data} bytes`],
        ["Address of entry point", hexify(exe_header.address_of_entry_point)],
        ["Base of code", hexify(exe_header.base_of_code)],
        ["Base of data", exe_header.base_of_data ? hexify(exe_header.base_of_data) : "Not found"],
        ["image_base", exe_header.image_base],
        ["section_alignment", exe_header.section_alignment],
        ["file_alignment", exe_header.file_alignment],
        ["operating_system_version", `${exe_header.major_operating_system_version}.${exe_header.minor_operating_system_version}`],
        ["image_version", `${exe_header.major_image_version}.${exe_header.minor_image_version}`],
        ["subsystem_version", `${exe_header.major_subsystem_version}.${exe_header.minor_subsystem_version}`],
        ["size_of_image", `${exe_header.size_of_image} bytes`],
        ["size_of_headers", `${exe_header.size_of_headers} bytes`],
        ["checksum", `${exe_header.checksum}`],
        ["subsystem", `${exe_header.subsystem}`],
        ["size_of_stack_reserve", `${exe_header.size_of_stack_reserve} bytes`],
        ["size_of_stack_commit", `${exe_header.size_of_stack_reserve} bytes`],
        ["size_of_heap_reserve", `${exe_header.size_of_heap_reserve} bytes`],
        ["size_of_heap_commit", `${exe_header.size_of_heap_commit} bytes`],
        ["loader_flags", `${exe_header.loader_flags} `],
        ["number_of_rva_and_sizes", `${exe_header.number_of_rva_and_sizes}`],
        ["high_entropy_virtual_address_space", `${characteristics.high_entropy_virtual_address_space} `],
        ["force_code_integrity", `${characteristics.force_code_integrity} `],
        ["no_isolation", `${characteristics.no_isolation} `],
        ["no_structured_exception_handling", `${characteristics.no_structured_exception_handling} `],
        ["no_bind", `${characteristics.no_bind} `],
        ["force_app_container", `${characteristics.force_app_container} `],
        ["wdm_driver", `${characteristics.wdm_driver} `],
        ["supports_control_flow_guard", `${characteristics.supports_control_flow_guard} `],
        ["terminal_server_aware", `${characteristics.terminal_server_aware} `],



    ];
    return <>
        <KeyValueTable data={data}></KeyValueTable>
    </>;
}
