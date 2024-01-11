"use client";

import * as React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

function UIProviders(props: {
  children?: React.ReactNode,
}) {
  return <Tooltip.Provider delayDuration={200} skipDelayDuration={100}>
    {props.children}
  </Tooltip.Provider>;
}

export default UIProviders;
