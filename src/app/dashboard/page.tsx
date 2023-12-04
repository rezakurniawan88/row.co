import NavbarDashboard from "@/components/dashboard/navbar-dashboard";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";

export default function page() {
    return (
        <main>
            <NavbarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <h1 className="mt-2 text-xl">Hello, Administrator</h1>
                </div>
            </div>
        </main>
    )
}
