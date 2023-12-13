"use client";

import * as React from 'react';
import useMemoizedObject from "@/hooks/useMemoizedObject";
import {produce} from "immer";

export interface Tab {
  filename: string,
  analysisId: string,
  close(this: Tab): void,
}

interface CreateTabParams {
  filename: string,
  analysisId: string
}

interface TabsContext {
  tabs: Tab[],

  createTab(params: CreateTabParams): void,
}

export const TabsContext = React.createContext<TabsContext>({
  createTab(params: { filename: string; analysisId: string }) {
  },
  tabs: [],
});

function TabsProvider(props: {
  children?: React.ReactNode,
}) {
  const [tabs, setTabs] = React.useState<Tab[]>([]);

  const closeTab = React.useCallback((id: string) => {
    setTabs((currentTabs) => {
      return currentTabs.filter(tab => tab.analysisId !== id);
    });
  }, []);

  const createTab = React.useCallback((params: CreateTabParams) => {
    const newTab: Tab = {
      ...params,
      close() {
        closeTab(this.analysisId);
      }
    };

    setTabs((currentTabs) => {
      if (currentTabs.some(tab => tab.analysisId === params.analysisId)) return currentTabs;

      return produce(currentTabs, (draft) => {
        draft.push(newTab);
      });
    });
  }, []);

  return <TabsContext.Provider value={useMemoizedObject({
    tabs: tabs,
    createTab,
  })}>
    {props.children}
  </TabsContext.Provider>;
}

export default TabsProvider;
