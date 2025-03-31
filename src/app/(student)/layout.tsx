"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Sidebar from "@/components/shared/Sidebar";
import BottomNavbar from "@/components/shared/BottomNavbar";
import MobileNav from "@/components/shared/MobileNav";
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
      <div className="flex-1 lg:ml-64 max-sm:pt-10">
        {children}
      </div>
      <BottomNavbar />
      <MobileNav />
    </div>
  );
};

export default Layout;
