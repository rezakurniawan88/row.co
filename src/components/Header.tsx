"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleNavbar() {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="flex justify-between items-center px-6 md:px-10 py-4 border-b-[1px]">
                <h1 className="header-title font-bold text-xl">ROW.CO</h1>
                <ul className="navbar-text hidden sm:flex gap-6 font-medium">
                    <li className="hover:border-b-2 hover:border-black cursor-pointer">Home</li>
                    <li className="hover:border-b-2 hover:border-black cursor-pointer">Explore</li>
                    <li className="hover:border-b-2 hover:border-black cursor-pointer">New Arrivals</li>
                    <li className="hover:border-b-2 hover:border-black cursor-pointer">Brands</li>
                </ul>
                <div className="flex gap-3">
                    <div className="flex items-center">
                        <button className="p-3 mr-1 rounded-full hover:bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        </button>
                        <Link href="/cart">
                            <button className="p-3 rounded-full hover:bg-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                            </button>
                        </Link>
                        <Link href="/auth/login">
                            <button className="p-3 rounded-full hover:bg-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </button>
                        </Link>
                    </div>
                    <button onClick={toggleNavbar} className="md:hidden p-3 rounded-full hover:bg-slate-100 z-40">
                        {isOpen ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>)}
                    </button>
                </div>
            </header>
            {/* <nav className={isOpen ? "navbar-overlay show-navbar z-30" : "hidden"}>
                <ul className="menu-list w-full h-full flex flex-col justify-center items-center gap-7 text-xl">
                    <li className="font-bold text-center hover:text-blue-500 cursor-pointer">Home</li>
                    <li className="font-bold text-center hover:text-blue-500 cursor-pointer">Man</li>
                    <li className="font-bold text-center hover:text-blue-500 cursor-pointer">Women</li>
                    <li className="font-bold text-center hover:text-blue-500 cursor-pointer">Kids</li>
                    <li className="font-bold text-center hover:text-blue-500 cursor-pointer">Promo</li>
                </ul>
            </nav> */}
        </>
    )
}