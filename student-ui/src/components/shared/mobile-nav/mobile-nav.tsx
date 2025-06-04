"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { navItems } from "../sidebar-items";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="lg:hidden">
            {/* Header with Logo and Menu Button */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 bg-background/80 backdrop-blur-sm border-b border-border">
                {/* Logo and Platform Name */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/eduai.png"
                        alt="Edu Ai Logo"
                        width={32}
                        height={32}
                        className="rounded-lg"
                    />
                    <span className="text-lg font-semibold">Edu Ai</span>
                </div>

                {/* Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0  bg-background/80 backdrop-blur-sm z-50"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Navigation Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-background border-l border-border transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}

            >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">

                    <div className="p-4 flex items-center ">
                        <Image src="/images/eduai.png" alt="Edu Ai" width={32} height={32} />
                        <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-gray-200">Edu Ai</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div className="flex-1 p-6">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User profile section - Fixed at bottom */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 mt-auto">
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://avatar.iran.liara.run/public"
                                alt="User profile"
                            />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Deepak Kumar</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">deepakjamui26@gmail.com</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
