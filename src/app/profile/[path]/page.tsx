"use client"

import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import { LucideMail } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import Image from "next/image"
import useUserStore from "@/stores/userStore"
import { TooltipProvider } from "@/components/ui/tooltip"
import ListProducts from "@/components/tabs/list-products"
import ManageOrders from "@/components/tabs/manage-orders"
import OrderHistory from "@/components/tabs/order-history"
import AddressTabs from "@/components/tabs/address-tabs"
import AccountSettings from "@/components/tabs/account-settings"
import TabsListByRole from "@/components/tabs/tabs-list-role"

export default function ProfilePage({ params }: { params: { path: string } }) {
    const { userData } = useUserStore((state) => state);

    return (
        <main>
            <TooltipProvider>
                <InfoTips />
                <Header />
                <nav className="flex space-x-2 items-center mx-10 md:mx-16 mt-8">
                    <Link href="/">
                        <h1 className="text-sm font-light hover:underline">Home</h1>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <h1 className="text-sm font-light hover:underline">Profile</h1>
                </nav>

                <section className="flex flex-col justify-center items-center py-10 mx-10 md:mx-16 mb-28 md:mb-0 space-y-6">
                    <div className="flex flex-col justify-center items-center w-full border rounded-lg p-6 gap-2">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border overflow-hidden">
                            {userData?.profile_picture_url === null ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full object-cover rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            ) : (
                                <Image src={userData?.profile_picture_url} width={200} height={200} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
                            )}
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold">{userData?.username === null ? "Guest" : userData?.username}</h1>
                        <div className="flex gap-2">
                            <LucideMail className="text-gray-500" />
                            <p className="text-base">{userData?.email === null ? "guest@email.com" : userData?.email}</p>
                        </div>
                    </div>
                    <Tabs defaultValue={params.path} className="w-full">
                        <TabsListByRole />
                        <ListProducts />
                        <ManageOrders />
                        <OrderHistory />
                        <AddressTabs />
                        <AccountSettings />
                    </Tabs>
                </section>
                <Footer />
            </TooltipProvider>
        </main>
    )
}
