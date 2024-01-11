import * as React from 'react';
import {useParams} from "next/navigation";
import IconButton from "@/components/IconButton";
import {FaFileExport} from "react-icons/fa6";
import {downloadAnalysisData} from "@/helpers/download";

function ExportButton() {
  const params = useParams<{
    analysisId?: string,
  }>();
  const id = params.analysisId;
  if (!id) return null;
  return <IconButton icon={FaFileExport} onClick={() => {
    downloadAnalysisData(+id).then()
  }}></IconButton>;
}

export default ExportButton;
