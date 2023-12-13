import * as React from 'react';

function HorizontalContainer(props: {
  children?: React.ReactNode
}) {
  return <div className={"py-2 px-[8px] bg-background-2 flex-none flex gap-[4px] border-b-[1px] border-b-border-1"}>
    {props.children}
  </div>;
}

export default HorizontalContainer;
