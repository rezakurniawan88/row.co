"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useUserStore from "@/stores/userStore";
import Image from "next/image";
import Link from "next/link";
import Logout from "../logout";

export function UserNav() {
    const { userData } = useUserStore((state) => state);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2.5 rounded-full hover:bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 md:w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="w-10 h-10 border rounded-full overflow-hidden">
                            {userData?.profile_picture_url === null ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full object-cover rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            ) : (
                                <Image src={userData?.profile_picture_url} alt="profile-picture" width={100} height={100} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-xs md:text-sm font-medium leading-none">{userData?.username || "Guest"}</p>
                            <p className="text-[0.6rem] md:text-xs leading-none text-muted-foreground">{userData?.email || "guest@email.com"}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {userData?.role === "ADMIN" && (
                        <>
                            <Link href="/dashboard">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Dashboard
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/profile/account">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    My Account
                                </DropdownMenuItem>
                            </Link>
                            <Link href="dashboard/products">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Manage Products
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/dashboard/orders">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Manage Orders
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/dashboard/users">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Manage Users
                                </DropdownMenuItem>
                            </Link>
                        </>
                    )}

                    {userData?.role === "BRAND" && (
                        <>
                            <Link href="/profile/account">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    My Account
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/profile/products">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Manage Products
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/profile/manage-orders">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Manage Orders
                                </DropdownMenuItem>
                            </Link>
                        </>
                    )}

                    {userData?.role === "USER" && (
                        <>
                            <Link href="/profile/order-history">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Order History
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/profile/address">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    Address
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/profile/account">
                                <DropdownMenuItem className="text-xs md:text-sm cursor-pointer">
                                    My Account
                                </DropdownMenuItem>
                            </Link>
                        </>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Logout />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}