"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import EducatorSidebar from "@/components/shared/EducatorSidebar";
import BottomNavbar from "@/components/shared/BottomNavbar";
import EducatorMobileNav from "@/components/shared/EducatorMobileNav";
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
      <EducatorSidebar />
      <div className="flex-1 lg:ml-64 max-sm:py-14">
        {children}
      </div>
      <BottomNavbar />
      <EducatorMobileNav />
    </div>
  );
};

export default Layout;
