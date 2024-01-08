"use client";

import * as React from 'react';
import {FaUpload} from "react-icons/fa6";
import useUploadFile from "@/hooks/useUploadFile";

function NewFileInput() {
  const uploadFile = useUploadFile();

  return <div
    className={"w-full h-full flex-1 relative flex flex-col text-center p-[8px]  justify-center items-center gap-1"}>
    <FaUpload className={"h-[6rem] w-[6rem] block mb-4"}></FaUpload>
    <p className={"font-[700]"}>Click here or drop file to upload</p>
    <p>Accepted files: .exe</p>
    <input
      className={"opacity-0 w-full h-full absolute z-[1] cursor-pointer"}
      type={"file"}
      accept={".exe"}
      draggable={true}
      onChange={e => {
        const files = e.currentTarget.files;
        if (files && files[0] && files[0].size > 0) {
          uploadFile(files[0]).then();
        }
        e.currentTarget.value = "";
      }}
    />
  </div>;
}

export default NewFileInput;
