// components/BottomNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center sm:hidden">
      <ul className="flex w-full dark:bg-background/90 justify-evenly rounded-t-3xl border-t border-bg-700 bg-backdrop text-text-secondary shadow backdrop-blur-md">
        <li className="p-4">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/dashboard" ? "text-highlight" : "text-text-primary"}`}
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
              className="lucide lucide-home"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-xs">Dashboard</span>
          </Link>
        </li>
        <li className="p-4">
          <Link
            href="/learning-playlists"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/learning-playlists" ? "text-highlight" : "text-text-primary"}`}
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
              className="lucide lucide-book-open"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span className="text-xs">Resources</span>
          </Link>
        </li>
        <li className="p-4">
          <Link
            href="/learning-roadmap"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/learning-roadmap" ? "text-highlight" : "text-text-primary"}`}
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
              className="lucide lucide-map"
            >
              <polygon points="3 3 21 3 21 21 3 21 3 3"></polygon>
              <path d="M9 3v18"></path>
              <path d="M15 3v18"></path>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
            </svg>
            <span className="text-xs">Roadmap</span>
          </Link>
        </li>
        <li className="p-4">
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/profile" ? "text-highlight" : "text-text-primary"}`}
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
              className="lucide lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-xs">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}