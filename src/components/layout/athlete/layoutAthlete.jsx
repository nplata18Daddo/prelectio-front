import React from "react";
import { Outlet } from "react-router-dom";
import { FooterAthlete } from "./footerAthlete";
import { NavBarAthlete } from "./navbarAthlete";

export const LayoutAthlete = (props) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <NavBarAthlete role={props.role} routeName={props.routeName} />
      <Outlet />
      <FooterAthlete role={props.role} />
    </div>
  );
};
