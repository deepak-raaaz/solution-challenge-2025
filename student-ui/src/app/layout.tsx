"use client"
import { DM_Sans} from "next/font/google";
import "./globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Providers } from "./Provider";
import { ToastContainer } from "react-toastify";

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

       {children}
       <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
