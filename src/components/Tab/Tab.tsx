"use client";

import * as React from 'react';
import {Tab} from "@/components/TabsProvider"
import {TinyIconButton} from "@/components/IconButton";
import {FaXmark} from "react-icons/fa6";
import Link from "next/link";

interface TabProps {
  tab: Tab
}

function Tab(props: TabProps) {
  return <div className={"relative px-[8px] min-w-[10rem] py-1 bg-background-3 flex items-center gap-2 rounded-[4px] text-[0.875rem]"}>
    <Link className={"absolute w-full h-full z-[0]"} href={`/analysis/${props.tab.analysisId}`}></Link>
    <span className={"flex justify-center text-center flex-1"}>{props.tab.filename}</span>
    <TinyIconButton icon={FaXmark} className={"relative flex-none z-[1]"} onClick={() => {
      props.tab.close();
    }}></TinyIconButton>
  </div>;
}

export default Tab;
