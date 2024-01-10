import * as React from 'react';
import * as Tooltip from "@radix-ui/react-tooltip";

function Highlight(props: {
  char: string
}) {
  return <strong className={"text-red-500"}>{props.char}</strong>;
}

function StringCell(string: Application.String) {
  const chars = Array.from(string.data).map(c => {
    return {
      char: c,
      highlighted: false,
    };
  });

  try {
    for (let match of string.matches) {
      for (let i = match.start; i < match.end; i++) {
        chars[i].highlighted = true;
      }
    }
  } catch (e) {
    console.log("Bad string:", string);
  }

  return <Tooltip.Root>
    <Tooltip.Trigger className={"w-full text-left"}>
      <span className={"w-full overflow-shown font-mono"}>
        {chars.map((char, index) => {
          return char.highlighted ? <Highlight char={char.char} key={index}></Highlight> : char.char;
        })}
      </span>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content
        className={"bg-background-2 p-2 rounded-[4px] border-border-1 border-[2px] z-[3] w-max max-w-[100vw]"}
        sideOffset={4}>
        <Tooltip.Arrow className={"fill-border-1"}/>
        {chars.map((char, index) => {
          return char.highlighted ? <Highlight char={char.char} key={index}></Highlight> : char.char;
        })}
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>;

}

export default React.memo(StringCell);
