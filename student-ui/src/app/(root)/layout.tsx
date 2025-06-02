"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Sidebar from "@/components/shared/sidebar/sidebar";
import BottomNavbar from "@/components/shared/bottom-navbar/bottom-navbar";
import MobileNav from "@/components/shared/mobile-nav/mobile-nav";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import DesktopNavbar from "@/components/shared/nav-bar/desktop-navbar";
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
  const { isLoading } = useLoadUserQuery({});

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64 max-sm:py-0">
        <DesktopNavbar/>
        {children}
      </div>
      <BottomNavbar />
      <MobileNav />
    </div>
  );
};

export default Layout;
