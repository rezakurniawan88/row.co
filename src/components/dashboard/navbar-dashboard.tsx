"use client"

import { useState } from "react";
import useUserStore from "@/stores/userStore";
import Link from "next/link";
import Image from "next/image";
import Logout from "../logout";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function NavbarDashboard() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { userData } = useUserStore((state) => state);
    const { sidebarOpen, setSidebarOpen } = useDashboardStore((state) => state);

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/">
                                <h1 className="text-black ml-2 md:mr-24 self-center text-xl font-bold sm:text-2xl whitespace-nowrap">ROW.CO</h1>
                            </Link>
                        </div>

                        <button onClick={() => setIsProfileOpen(() => !isProfileOpen)} className="flex gap-4 items-center text-gray-900 bg-transparent font-medium rounded-lg text-sm text-center break-all" type="button">
                            {userData?.profile_picture_url === null ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 rounded-full cursor-pointer"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                            ) : (
                                <Image src={userData?.profile_picture_url} alt="profile-picture" width={50} height={50} className="w-8 h-8 rounded-full cursor-pointer" />
                            )}
                            <div className="flex gap-4 items-center">
                                <div className="text-left">
                                    <p className="text-gray-900 text-xs font-bold">{userData?.username}</p>
                                    <p className="text-[10px] text-[#44435C] font-medium">{userData?.role}</p>
                                </div>
                                <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </button>

                        <div className={isProfileOpen ? "w-44 bg-white rounded divide-y divide-gray-100 shadow absolute top-14 right-6" : "hidden"}>
                            <div className="py-3 px-4 text-xs text-gray-900">
                                <div>{userData?.username}</div>
                                <div className="font-medium truncate">{userData?.email}</div>
                            </div>
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
