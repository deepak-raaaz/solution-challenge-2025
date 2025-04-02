"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import { Button } from "../ui/button";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const pathname = usePathname();
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 0,
    duration: 700,
    // Set dark mode as the default
    isDarkMode: true, // Add this if supported by useModeAnimation
  });

  // Apply the theme class to the <html> element and set default to dark mode
  useEffect(() => {
    // Check localStorage first; if no preference exists, default to dark
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Sync with isDarkMode changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // GSAP scroll animation (unchanged)
  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const ctx = gsap.context(() => {
      gsap.set(navElement, {
        maxWidth: "1280px",
        backgroundColor: "transparent",
        backdropFilter: "none",
        outline: "0px",
      });

      gsap.to(navElement, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=150",
          scrub: true,
        },
        maxWidth: 800,
        backgroundColor: "var(--backdrop)",
        backdropFilter: "blur(12px)",
        outline: "1px solid var(--bg-700)",
        ease: "linear",
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [pathname]);

  return (
    <header className="pointer-events-none sticky left-0 right-0 top-0 z-50 w-full px-0 py-4 md:flex md:justify-center">
      <nav
        ref={navRef}
        className="pointer-events-auto flex w-full items-center justify-between gap-6 rounded-full px-2 py-1 transition-colors sm:pr-4"
        style={{
          maxWidth: "1280px",
          backgroundColor: "transparent",
          backdropFilter: "none",
          outline: "0px",
          opacity: 1,
          willChange: "max-width, background-color, backdrop-filter, outline",
        }}
      >
        <Link
          href="/"
          className="font-dm-sans text-2xl font-semibold text-text-primary sm:text-xl flex items-center gap-2 h-10"
        >
          <Image src="/images/eduai.png" alt="Logo" width={50} height={50} />
          <span className="nowrap font-pp-neue-montreal text-2xl font-semibold text-text-primary">Edu Ai</span>
        </Link>
        <ul className="hidden gap-6 text-sm text-text-secondary sm:flex font-satoshi">
          <li className="group relative">
            <Link
              href="/"
              className={`flex items-center gap-2 ${
                pathname === "/" ? "active-link" : ""
              }`}
            >
              {pathname === "/" && (
                <span className="w-2 h-2 bg-highlight rounded-full"></span>
              )}
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                  Home
                </div>
                <div className="absolute translate-y-[110%] skew-y-12 transform-gpu text-text-primary transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Home
                </div>
              </span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/about"
              className={`flex items-center gap-2 ${
                pathname === "/about" ? "active-link" : ""
              }`}
            >
              {pathname === "/about" && (
                <span className="w-2 h-2 bg-highlight rounded-full"></span>
              )}
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                  About
                </div>
                <div className="absolute translate-y-[110%] skew-y-12 transform-gpu text-text-primary transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  About
                </div>
              </span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/how-it-works"
              className={`flex items-center gap-2 ${
                pathname === "/how-it-works" ? "active-link" : ""
              }`}
            >
              {pathname === "/how-it-works" && (
                <span className="w-2 h-2 bg-highlight rounded-full"></span>
              )}
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                  How it works
                </div>
                <div className="absolute translate-y-[110%] skew-y-12 transform-gpu text-text-primary transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  How it works
                </div>
              </span>
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/resources"
              className={`flex items-center gap-2 ${
                pathname === "/resources" ? "active-link" : ""
              }`}
            >
              {pathname === "/resources" && (
                <span className="w-2 h-2 bg-highlight rounded-full"></span>
              )}
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                  Resources
                </div>
                <div className="absolute translate-y-[110%] skew-y-12 transform-gpu text-text-primary transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Resources
                </div>
              </span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-center gap-4">
          <button
            ref={ref}
            onClick={toggleSwitchTheme}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 w-11 relative rounded-full border border-bg-700 bg-backdrop text-text-primary backdrop-blur-md transition-all active:scale-90 sm:h-10 sm:w-10 sm:border-none sm:bg-transparent sm:shadow-none sm:backdrop-blur-none"
          >
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: isDarkMode ? 0 : 1,
                willChange: "opacity",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: isDarkMode ? 1 : 0,
                willChange: "opacity",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </div>
            <span className="sr-only">Toggle theme</span>
          </button>
          <Link href="/dashboard" className="!cursor-pointer">
            <Button className="rounded-full font-semibold cursor-pointer">Get Started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}