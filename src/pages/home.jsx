import React from "react";
import prelectioLogo from "../assets/logo_prelectio.png";
import { AboutUs, Main, CallToAction, Services } from "../components/components";
export const Home = () => {
  return (
    <div>
      <Main />
      <AboutUs />
      <Services />
      <CallToAction />
    </div>
  );
};
