import { Bell, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import NotificationWidget from '../notification/notification'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const DesktopNavbar = () => {
    const unreadCount = 1
    return (
        <nav className='w-[calc(100%-16rem)] h-18 bg-[#0e1217cb] backdrop-blur-xl flex items-center justify-between px-8 fixed z-50 max-lg:hidden'>
            <div className="gap-8 flex items-center">
                <Link href="/" className="text-base text-gray-100">
                    Learning Paths
                </Link>
                <Link href="/" className="text-base text-gray-100">
                    Create
                </Link>
                <Link href="/" className="text-base text-gray-100">
                    Build
                </Link>
            </div>
            <div className="flex items-center gap-4 ">

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className="h-10 w-10 cursor-pointer bg-gray-800/40 border relative border-gray-700/40 flex items-center justify-center  text-gray-200 rounded-full  transition-colors"

                        >
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="">
                        <NotificationWidget />

                    </PopoverContent>
                </Popover>

                {/* <button className="h-10 w-10 bg-gray-800/40 border border-gray-700/40 flex items-center justify-center  text-gray-200 rounded-full  transition-colors">
                    <Search size={18} />
                </button> */}
                <button
                    onClick={() =>
                        toast("Educator Portal Launching Soon!", {
                            description: "We’re building something exciting. Get ready to join as an educator!",
                        })
                    }
                    className="h-10 px-6 bg-gray-800/40 cursor-pointer   flex items-center justify-center  text-gray-200 rounded-full  transition-colors">
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