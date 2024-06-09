import useUserStore from "@/stores/userStore";
import { TabsList, TabsTrigger } from "../ui/tabs";

export default function TabsListByRole() {
    const { userData } = useUserStore((state) => state);

    return (
        <TabsList className="w-full bg-transparent border justify-start py-6 px-4">
            {userData?.role === "ADMIN" && (
                <>
                    <TabsTrigger value="account" className="data-[state=active]:bg-stone-100">Account</TabsTrigger>
                </>
            )}
            {userData?.role === "BRAND" && (
                <>
                    <TabsTrigger value="products" className="data-[state=active]:bg-stone-100">Products</TabsTrigger>
                    <TabsTrigger value="manage-orders" className="data-[state=active]:bg-stone-100">Manage Orders</TabsTrigger>
                    <TabsTrigger value="account" className="data-[state=active]:bg-stone-100">Account</TabsTrigger>
                </>
            )}
            {userData?.role === "USER" && (
                <>
                    <TabsTrigger value="order-history" className="data-[state=active]:bg-stone-100">Order History</TabsTrigger>
                    <TabsTrigger value="address" className="data-[state=active]:bg-stone-100">Address</TabsTrigger>
                    <TabsTrigger value="account" className="data-[state=active]:bg-stone-100">Account</TabsTrigger>
                </>
            )}
        </TabsList>
    )
}
