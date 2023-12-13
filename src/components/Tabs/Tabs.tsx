"use client";

import * as React from 'react';
import HorizontalContainer from "@/components/HorizontalContainer";
import {TabsContext} from "@/components/TabsProvider";
import Tab from "@/components/Tab";
import NewTabButton from "@/components/NewTabButton";

function Tabs() {
  const {tabs} = React.useContext(TabsContext);

  return <HorizontalContainer>
    {tabs.map(function (tab) {
      return <Tab tab={tab} key={tab.analysisId}></Tab>;
    })}
    <NewTabButton></NewTabButton>
  </HorizontalContainer>;
}

export default Tabs;
