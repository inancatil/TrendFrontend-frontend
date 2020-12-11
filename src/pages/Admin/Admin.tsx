import React from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import NavigationDrawer from "../../components/Layout/NavigationDrawer/NavigationDrawer";
import Categories from "./Categories/Categories";

export interface IAdminProps {
  children: React.ReactNode;
}

export default function Admin(props: IAdminProps) {
  return <NavigationDrawer>{props.children}</NavigationDrawer>;
}
