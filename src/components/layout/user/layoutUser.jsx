import React from "react";
import { Outlet } from "react-router-dom";

import { FooterUser } from "./footerUser";
import { NavBarUser } from "./navbarUser";

export const LayoutUser = (props) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <NavBarUser role={props.role} routeName={props.routeName} />
      <Outlet />
      <FooterUser role={props.role} />
    </div>
  );
};
