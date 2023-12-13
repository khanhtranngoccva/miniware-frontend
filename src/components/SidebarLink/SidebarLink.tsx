import * as React from 'react';
import Link, {LinkProps} from "next/link";

export interface SidebarLinkProps extends LinkProps {
  className?: string,
  children?: string,
}

function SidebarLink(props: SidebarLinkProps) {
  return <Link {...props} className={`px-[16px] pr-[32px] py-2 flex gap-2 ${props.className}`}>
    {props.children}
  </Link>;
}

export default SidebarLink;
