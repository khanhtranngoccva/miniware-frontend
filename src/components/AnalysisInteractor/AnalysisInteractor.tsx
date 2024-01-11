"use client";

import * as React from 'react';
import {TabsContext} from "@/components/TabsProvider";

function AnalysisInteractor(props: {
  analysisId: number,
  filename: string
}) {
  const tabContext = React.useContext(TabsContext);
  React.useEffect(() => {
    tabContext.createTab({
      analysisId: props.analysisId.toString(),
      filename: props.filename,
    })
  }, [props.analysisId, props.filename]);
  return null;
}

export default AnalysisInteractor;
