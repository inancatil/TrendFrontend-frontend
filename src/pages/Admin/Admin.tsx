import React from "react";
import NavigationDrawer from "../../components/Admin/Layout/NavigationDrawer/NavigationDrawer";
import ErrorHandler from "../../components/modal/ErrorHandler";

export interface IAdminProps {
  children: React.ReactNode;
}

export default function Admin(props: IAdminProps) {
  return (
    <NavigationDrawer>
      <ErrorHandler>{props.children}</ErrorHandler>
    </NavigationDrawer>
  );
}
