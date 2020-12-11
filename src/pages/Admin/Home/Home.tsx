import React from "react";
import NavigationDrawer from "../../../components/Layout/NavigationDrawer/NavigationDrawer";

export interface IHomeProps {}

export default function Admin(props: IHomeProps) {
  return (
    <NavigationDrawer>
      <p>Admin Home</p>
    </NavigationDrawer>
  );
}
