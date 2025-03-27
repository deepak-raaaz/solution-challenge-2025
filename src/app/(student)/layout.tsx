"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Sidebar from "@/components/shared/Sidebar";

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        {children}
      </div>
    </div>
  );
};

export default Layout;
