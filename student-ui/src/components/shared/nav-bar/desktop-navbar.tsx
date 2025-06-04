import { Bell, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DesktopNavbar = () => {
    return (
        <nav className='w-[calc(100%-16rem)] h-18 bg-[#0E1217] flex items-center justify-between px-8 fixed z-50 max-lg:hidden'>
            <div className="gap-8 flex items-center">
                <Link href="/" className="text-lg text-gray-100">
                    Learning Paths
                </Link>
                <Link href="/" className="text-lg text-gray-100">
                    Create
                </Link>
                <Link href="/" className="text-lg text-gray-100">
                    Build
                </Link>
            </div>
            <div className="flex items-center gap-4 ">
                <button className="h-10 w-10 bg-gray-800/40 border border-gray-700/40 flex items-center justify-center  text-gray-200 rounded-full  transition-colors">
                    <Bell size={18}/>
                </button>
                <button className="h-10 w-10 bg-gray-800/40 border border-gray-700/40 flex items-center justify-center  text-gray-200 rounded-full  transition-colors">
                    <Search size={18}/>
                </button>
                <button className="h-10 px-6 bg-gray-800/40   flex items-center justify-center  text-gray-200 rounded-full  transition-colors">
                    Become a Educator
                </button>
                <button className="h-10 px-6 bg-gray-800/40 border border-gray-700/40 flex items-center justify-center  text-gray-200 rounded-full  transition-colors">
                    My Playlists
                </button>

            </div>
        </nav>
    )
}

export default DesktopNavbar