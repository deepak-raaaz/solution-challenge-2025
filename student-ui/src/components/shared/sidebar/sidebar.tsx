'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { navItems } from '../sidebar-items';


export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <nav className="hidden lg:flex  lg:flex-col lg:w-64 h-screen bg-white border-r border-gray-200 dark:bg-gray-800/20 dark:border-gray-700/40 overflow-y-auto shadow-sm fixed">
      {/* Logo and app name */}
      <div className="p-4 flex items-center border-b border-gray-200 dark:border-gray-700/40">
        <Image src="/images/eduai.png" alt="Edu Ai" width={32} height={32} />
        <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-gray-200">Edu Ai</span>
      </div>

      {/* Navigation links */}
      <div className="py-4 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 transition-colors duration-200 ${
              pathname === item.href    
                ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600 dark:text-blue-400 dark:bg-gray-700 dark:border-blue-400'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-gray-700 dark:hover:text-blue-400'
            }`}
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* User profile section */}
      <Link href="/profile">
      <div className="border-t border-gray-200 dark:border-gray-700/40 p-4">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://avatar.iran.liara.run/public"
            alt="User profile"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
      </Link>
    </nav>
  );
}