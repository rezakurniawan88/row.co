"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { useFetchAccessToken } from "@/hooks/token/useFetchAccessToken";
import { UserNav } from "./user-nav";
import useCartStore from "@/stores/cartStore";
import Search from "./search";

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isLoading: loadingFetchToken, isSuccess: fetchTokenSuccess, isError: notLogin } = useFetchAccessToken();
    const { carts } = useCartStore((state) => state);

    function toggleNavbar() {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="sticky top-0 flex justify-between items-center bg-white px-4 md:px-10 py-4 border-b-[1px] backdrop-filter backdrop-blur-lg bg-opacity-50 z-40">
                <div className="flex items-center gap-1">
                    <button onClick={toggleNavbar} className="md:hidden p-3 rounded-full hover:bg-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>
                    </button>
                    <Link href="/">
                        <h1 className="header-title font-bold text-xl">ROW.CO</h1>
                    </Link>
                </div>
                <ul className="navbar-text hidden sm:flex gap-6 font-medium">
                    <Link href="/">
                        <li className="hover:border-b-2 hover:border-black cursor-pointer">Home</li>
                    </Link>
                    <Link href="/explore">
                        <li className="hover:border-b-2 hover:border-black cursor-pointer">Explore</li>
                    </Link>
                    <Link href="/new-arrivals">
                        <li className="hover:border-b-2 hover:border-black cursor-pointer">New Arrivals</li>
                    </Link>
                    <Link href="/brands">
                        <li className="hover:border-b-2 hover:border-black cursor-pointer">Brands</li>
                    </Link>
                </ul>
                <div className="flex gap-3">
                    <div className="flex items-center">
                        <Search />
                        <Link href="/cart">
                            <button className="relative p-3 rounded-full hover:bg-slate-50 hover:bg-opacity-80">
                                <button className={`${carts.length === 0 && "hidden"} absolute top-1 right-0 w-5 h-5 bg-red-500 text-[0.5rem] font-bold text-white rounded-full`}>{carts.length > 99 ? "99+" : carts.length}</button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                            </button>
                        </Link>
                        {notLogin && (
                            <Link href="/auth/login">
                                <Button className="px-5 py-2 ml-4 hover:bg-slate-700">Sign In</Button>
                            </Link>
                        )}

                        {fetchTokenSuccess && <UserNav />}

                        {loadingFetchToken && (
                            <div className="ml-4">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-slate-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className={`fixed bottom-0 left-0 right-0 w-full h-full bg-white flex flex-col items-center justify-center overflow-x-hidden z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-in-out`}>
                <button onClick={toggleNavbar} className="absolute top-5 left-5 md:hidden p-3 rounded-full hover:bg-slate-100 z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <ul className="flex flex-col gap-7 text-xl font-semibold text-center text-gray-500">
                    <Link href="/" onClick={() => setIsOpen(false)}><li className="hover:text-gray-900 hover:text-2xl">Home</li></Link>
                    <Link href="/explore" onClick={() => setIsOpen(false)}><li className="hover:text-gray-900 hover:text-2xl">Explore</li></Link>
                    <Link href="/new-arrivals" onClick={() => setIsOpen(false)}><li className="hover:text-gray-900 hover:text-2xl">New Arrivals</li></Link>
                    <Link href="/brands" onClick={() => setIsOpen(false)}><li className="hover:text-gray-900 hover:text-2xl">Brands</li></Link>
                </ul>
            </div>
        </>
    )
}