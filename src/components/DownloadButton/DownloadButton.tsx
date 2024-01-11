import * as React from 'react';
import IconButton from "@/components/IconButton";
import {FaDownload} from "react-icons/fa6";
import {useParams} from "next/navigation";
import {downloadAnalysisFile} from "@/helpers/download";

function DownloadButton() {
  const params = useParams<{
    analysisId?: string,
  }>();
  const id = params.analysisId;
  if (!id) return null;
  return <IconButton icon={FaDownload} onClick={() => {
    downloadAnalysisFile(+id).then()
  }}></IconButton>;
}

export default DownloadButton;
