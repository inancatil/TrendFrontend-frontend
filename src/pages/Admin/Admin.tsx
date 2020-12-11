import React from "react";
import NavigationDrawer from "../../components/Layout/NavigationDrawer/NavigationDrawer";

export interface IAdminProps {
  children: React.ReactNode;
}

export default function Admin(props: IAdminProps) {
  return <NavigationDrawer>{props.children}</NavigationDrawer>;
}
