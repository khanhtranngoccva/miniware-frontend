import * as React from 'react';

function Tag(props: {
  tag: string
}) {
  return <li className={"bg-background-1 rounded-[4px] px-1 py-0.5"}>{props.tag}</li>;
}

export default Tag;
