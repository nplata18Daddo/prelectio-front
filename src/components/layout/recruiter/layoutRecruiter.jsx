import React from "react";
import { Outlet } from "react-router-dom";
import { FooterRecruiter } from "./footerRecruiter";

import { NavBarRecruiter } from "./navbarRecruiter";

export const LayoutRecruiter = (props) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <NavBarRecruiter role={props.role} routeName={props.routeName} />
      <Outlet />
      <FooterRecruiter role={props.role} />
    </div>
  );
};
