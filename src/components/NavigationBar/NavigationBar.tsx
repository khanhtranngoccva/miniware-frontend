"use client";

import * as React from 'react';
import IconButton from "@/components/IconButton";
import {FaFileExport, FaRegFolderOpen} from "react-icons/fa6";
import HorizontalContainer from "@/components/HorizontalContainer";
import {getFile} from "@/helpers/getFile";

function NavigationBar() {
  return <HorizontalContainer>
    <IconButton icon={FaRegFolderOpen} onClick={async () => {
      console.log(await getFile());
    }}></IconButton>
    <IconButton icon={FaFileExport}></IconButton>
  </HorizontalContainer>;
}

export default NavigationBar;
