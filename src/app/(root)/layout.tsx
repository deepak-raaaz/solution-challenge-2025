"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  return <> <Navbar />
  {children}
  <Footer /></>;
};

export default Layout;
