import tab from "@/components/Tab";

declare global {
  declare namespace Api {
    type LocationType = "relative" | "absolute";
    type NodeType = "statement" | "feature";

    interface Response<T> {
      success: true,
      data: T,
    }

    interface PaginatedResponse<T> {
      success: true,
      data: T[],
      meta: {
        next?: string,
        prev?: string,
      }
    }
  }

  declare namespace Application {
    interface Analysis {
      id: number,
      file_id: number,
      file: File,
      filename: string,
      state: "processing" | "complete",
    }

    interface File {
      id: number;
      size: number;
      hashes: FileHash[];
    }

    interface FullAnalysis extends Analysis {
      basic_information: BasicInformation,
      file_header: FileHeader,
      optional_header: OptionalHeader,
      imports: Import[],
      exports: Export[],
      resources: Resource[],
      sections: Section[],
      strings: String[],
      capa: CAPAEntry[],
    }

    interface Hash {
      id: number,
      algorithm: string,
      value: string,
    }

    interface FileHash extends Hash {
      file_id: number,
    }

    interface ResourceHash extends Hash {
      resource_id: number,
    }

    interface SectionHash extends Hash {
      section_id: number,
    }

    interface BasicInformation {
      analysis_id: number,
      entropy: number,
      imphash: string,
      company: string,
      description: string,
      version: string,
      internal_name: string,
      copyright: string,
      original_filename: string,
      product_name: string,
      product_version: string,
      language_id: string,
    }

    interface FileHeader {
      analysis_id: number,
      machine: string,
      compiled_at: string,
      sections: number,
      pointer_to_symbol_table: number,
      number_of_symbols: number,
      size_of_optional_header: number,
      characteristics: FileHeaderCharacteristics
    }

    interface FileHeaderCharacteristics {
      "analysis_id": number,
      "relocation_stripped": boolean,
      "executable": boolean,
      "coff_line_numbers_stripped": boolean,
      "coff_local_symbol_table_stripped": boolean,
      "aggressive_trim_working_set": boolean,
      "large_address_aware": boolean,
      "little_endian": boolean,
      "32bit": boolean,
      "debug_stripped": boolean,
      "load_to_swap_if_on_removable_media": boolean,
      "load_to_swap_if_on_network": boolean,
      "system_image": boolean,
      "dynamic_link_library": boolean,
      "uniprocessor_only": boolean,
      "big_endian": boolean,
    }

    interface OptionalHeader {
      "analysis_id": number,
      "magic": number,
      "major_linker_version": number,
      "minor_linker_version": number,
      "size_of_code": number,
      "size_of_initialized_data": number,
      "size_of_uninitialized_data": number,
      "address_of_entry_point": number,
      "base_of_code": number,
      "base_of_data": number | null,
      "image_base": number,
      "section_alignment": number,
      "file_alignment": number,
      "major_operating_system_version": number,
      "minor_operating_system_version": number,
      "major_image_version": number,
      "minor_image_version": number,
      "major_subsystem_version": number,
      "minor_subsystem_version": number,
      "size_of_image": number,
      "size_of_headers": number,
      "checksum": number,
      "subsystem": string,
      "size_of_stack_reserve": number,
      "size_of_stack_commit": number,
      "size_of_heap_reserve": number,
      "size_of_heap_commit": number,
      "loader_flags": number,
      "number_of_rva_and_sizes": number,
      "dll_characteristics": OptionalHeaderDllCharacteristics,
    }

    interface OptionalHeaderDllCharacteristics {
      "analysis_id": number,
      "high_entropy_virtual_address_space": boolean,
      "dynamic_base": boolean,
      "force_code_integrity": boolean,
      "no_isolation": boolean,
      "no_structured_exception_handling": boolean,
      "no_bind": boolean,
      "force_app_container": boolean,
      "wdm_driver": boolean,
      "supports_control_flow_guard": boolean,
      "terminal_server_aware": boolean,
    }

    interface Import {
      id: number,
      analysis_id: number,
      name: string,
      address: number,
    }

    interface Export {
      id: number,
      analysis_id: number,
      name: string,
      address: number,
      ordinal: number,
    }

    interface Resource {
      id: number,
      analysis_id: number,
      local_id: number,
      name: string,
      primary_language: string,
      sub_language: string,
      type: string,
      offset: number,
      size: number,
      hashes: ResourceHash[],
    }

    interface Section {
      id: number,
      analysis_id: number,
      virtual_size: number,
      virtual_address: number,
      raw_size: number,
      raw_address: number,
      name: string,
      entropy: number,
      hashes: SectionHash[],
      characteristics: SectionCharacteristics
    }

    interface SectionCharacteristics {
      "section_id": number,
      "object_file_pad_to_next_boundary": boolean,
      "has_executable_code": boolean,
      "has_initialized_data": boolean,
      "has_uninitialized_data": boolean,
      "object_file_section_contains_info": boolean,
      "object_file_section_to_remove_from_image": boolean,
      "object_file_section_includes_comdat": boolean,
      "has_global_pointer_data": boolean,
      "memory_purgeable": boolean,
      "memory_16bit": boolean,
      "memory_locked": boolean,
      "memory_preload": boolean,
      "object_file_alignment_bytes": number,
      "contains_extended_relocations": boolean,
      "discardable": boolean,
      "cacheable": boolean,
      "pageable": boolean,
      "shareable": boolean,
      "executable": boolean,
      "readable": boolean,
      "writeable": boolean,
    }

    interface String {
      id: number,
      analysis_id: number,
      score: number,
      data: string,
      tags: StringTag[],
      matches: StringMatch[],
    }

    interface StringTag {
      id: number,
      string_id: number,
      tag: string,
    }

    interface StringMatch {
      id: number,
      string_id: number,
      start: number,
      end: number,
      definition: string,
    }

    interface CAPAEntry {
      id: number,
      analysis_id: number,
      rule_name: string,
      rule_namespace: string | null,
      rule_scope: string,
      matches: CAPAMatch[],
    }

    interface CAPAMatch {
      id: number,
      capa_entry_id: number,
      location_type: string,
      location_value: number|null,
      nodes: (CAPAStatementNode | CAPAFeatureNode)[],
    }

    interface CAPANode {
      id: number,
      capa_match_id: number,
      feature_data: any | null,
      description: string | null,
      type: string,
      subtype: string,
      path: string,
      success: boolean,
      locations: CAPANodeLocation[],
    }

    interface CAPAFeatureNode extends CAPANode {
      feature_data: any,
      type: "feature",
      description: string | null,
    }

    interface CAPAStatementNode extends CAPANode {
      feature_data: null,
      type: "statement",
    }

    interface CAPANodeLocation {
      id: number,
      capa_node_id: number,
      type: string,
      value: number|null,
    }
  }

}

