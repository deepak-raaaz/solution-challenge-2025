"use client"
import { DM_Sans } from "next/font/google";
import "./globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Providers } from "./Provider";
import { ToastContainer } from "react-toastify";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/components/shared/loader";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-DMSans",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable}  antialiased `}
      >
        <Providers>
          <Custom>
            {children}
          </Custom>
          <Toaster />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}


const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
