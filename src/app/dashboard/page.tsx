"use client"

import NavbarDashboard from "@/components/dashboard/navbar-dashboard";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import LoadingPage from "@/components/ui/loading";
import { useFetchAccessToken } from "@/hooks/token/useFetchAccessToken";
import userStore from "@/stores/userStore";

export default function DashboardPage() {
    const { userData } = userStore((state) => state);
    const { isLoading: loadingToken } = useFetchAccessToken();

    return (
        <main>
            <NavbarDashboard />
            <SidebarDashboard />
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                    <h1 className="mt-2 text-lg md:text-xl">Hello, {userData?.username}</h1>
                </div>
            </div>

            {loadingToken ? (<LoadingPage />) : null}
        </main>
    )
}
