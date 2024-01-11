"use client";

import * as React from 'react';
import IconButton from "@/components/IconButton";
import {FaDownload, FaFileExport, FaRegFolderOpen} from "react-icons/fa6";
import HorizontalContainer from "@/components/HorizontalContainer";
import {getFile} from "@/helpers/getFile";
import DownloadButton from "../DownloadButton";
import ExportButton from "@/components/ExportButton";

function NavigationBar() {
  return <HorizontalContainer>
    <IconButton icon={FaRegFolderOpen} onClick={async () => {
      console.log(await getFile());
    }}></IconButton>
    <ExportButton></ExportButton>
    <DownloadButton></DownloadButton>
  </HorizontalContainer>;
}

export default NavigationBar;
