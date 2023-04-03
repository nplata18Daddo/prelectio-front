import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { NavBar } from "./navbvar";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
