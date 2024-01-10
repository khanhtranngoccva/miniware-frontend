import * as React from 'react';
import NavigationBar from "@/components/NavigationBar";
import Tabs from "@/components/Tabs";


function MainLayout(props: {
  children?: React.ReactNode
}) {
  return <main className={"w-full h-full flex flex-col overflow-shown"}>
    <NavigationBar></NavigationBar>
    <Tabs></Tabs>
    <div className={"flex-1 flex"}>
      {props.children}
    </div>
  </main>;
}

export default MainLayout;
