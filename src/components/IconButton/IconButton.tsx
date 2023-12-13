import * as React from 'react';
import {IconType} from "react-icons";
import {ComponentProps} from "react";
import Link, {LinkProps} from "next/link";

export interface IconButtonProps extends ComponentProps<"button"> {
  className?: string,
  icon: IconType,
  children?: React.ReactNode,
}

export interface IconLinkProps extends LinkProps {
  className?: string,
  icon: IconType,
  children?: React.ReactNode,
  href: string,
}

function IconButton(props: IconButtonProps) {
  const {icon: Icon, ...delegated} = props;


  return <button
    {...delegated}
    className={`px-[8px] py-1 flex aspect-square items-center justify-center gap-[1ch] rounded-[4px] bg-background-1 ${props.className}`}>
    {Icon ? <Icon className={"w-4 h-4"}/> : null}
    {props.children}
  </button>;
}

export function IconLink(props: IconLinkProps) {
  const {icon: Icon, ...delegated} = props;

  return <Link
    {...delegated}
    className={`px-[8px] py-1 flex aspect-square items-center justify-center gap-[1ch] rounded-[4px] bg-background-1 ${props.className}`}>
    {Icon ? <Icon className={"w-4 h-4"}/> : null}
    {props.children}
  </Link>;
}

export function TinyIconButton(props: IconButtonProps) {
  const {icon: Icon, ...delegated} = props;

  return <button
    {...delegated}
    className={`px-[4px] py-0.5 flex aspect-square items-center justify-center gap-[1ch] rounded-[4px] bg-background-1 ${props.className}`}>
    {Icon ? <Icon className={"w-2 h-2"}/> : null}
    {props.children}
  </button>;
}

export default IconButton;
