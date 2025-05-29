"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
}

const iconMap = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
  ),
  book: (
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
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  wand: (
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
      aria-hidden="true"
    >
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </svg>
  ),
  user: (
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
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const navItems: NavItem[] = [
  { href: "/generate", label: "Generate", icon: "wand" },
  { href: "/dashboard", label: "Dashboard", icon: "home" },
  { href: "/playlists", label: "Playlists", icon: "book" },
  { href: "/profile", label: "Profile", icon: "user" },
];

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
}

const NavItem: FC<NavItemProps> = memo(({ item, isActive }) => (
  <li className="p-4">
    <Link
      href={item.href}
      className="flex flex-col items-center justify-center gap-1 text-xs transition-colors"
      aria-current={isActive ? "page" : undefined}
    >
      <span className={isActive ? "text-blue-500" : "text-slate-300 group-hover:text-blue-500"}>
        {iconMap[item.icon]}
      </span>
      <span
        className={`${isActive
            ? "bg-gradient-to-b from-blue-400 to-blue-800 bg-clip-text text-transparent font-semibold"
            : "text-slate-300 group-hover:bg-gradient-to-b group-hover:from-blue-400 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent"
          }`}
      >
        {item.label}
      </span>
    </Link>
  </li>
));

NavItem.displayName = "NavItem";

const BottomNavbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center sm:hidden group"
      aria-label="Mobile navigation"
    >
      <ul className="flex w-full justify-evenly rounded-t-3xl border-t border-bg-700 bg-backdrop/90 text-text-secondary shadow backdrop-blur-md dark:bg-background/90">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </ul>
    </nav>
  );
};

export default memo(BottomNavbar);