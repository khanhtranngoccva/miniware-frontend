import * as React from 'react';
import IconButton, {IconLink} from "@/components/IconButton";
import {FaPlus} from "react-icons/fa6";

function NewTabButton() {
  return <IconLink icon={FaPlus} href={"/"}></IconLink>;
}

export default NewTabButton;
