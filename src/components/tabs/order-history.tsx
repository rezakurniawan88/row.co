import { useMutation, useQuery } from "react-query";
import { TabsContent } from "../ui/tabs";
import useUserStore from "@/stores/userStore";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import { sizeDetails } from "@/lib/data-items"
import { capitalizeWords } from "@/lib/utils";
import toast from "react-hot-toast";
import { LucideLoader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { OrderProps } from "@/types/order-types";

export default function OrderHistory() {
    const { userData } = useUserStore((state) => state);

    const { data: dataOrders, refetch: refetchDataOrders } = useQuery({
        queryKey: ["dataOrdersByUserId", userData?.userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/orders/${userData?.userId}`);
            return response?.data?.data;
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: completeOrder, isLoading: completeOrderIsLoading } = useMutation({
        mutationKey: ['completeOrder'],
        mutationFn: async (id) => {
            const response = await axiosInstance.patch(`/order/${id}`, { status: "DONE" });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchDataOrders();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    return (
        <TabsContent value="order-history">
            <div className="mt-6 border p-8 rounded-lg">
                <div className="mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">Order History</h1>
                    <p className="text-xs md:text-sm text-gray-400">Here you can manage your order</p>
                </div>
                <div className="space-y-4">
                    {dataOrders?.length === 0 ? (
                        <div className="w-full">
                            <h1 className="text-center text-slate-600 my-10">No Orders</h1>
                        </div>
                    ) :
                        dataOrders?.map((order: OrderProps, index: number) => {
                            let orderDate = new Date(order?.createdAt);

                            return (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                        <div className="p-4 border space-y-1 rounded-lg cursor-pointer hover:bg-slate-50">
                                            <div className="flex justify-between items-center border-b-[1px] pb-2 mb-4">
                                                <div>
                                                    <h1 className="text-xs font-light">{orderDate.toLocaleString().replace(/\.\d{3}$/, "")}</h1>
                                                    <h1 className="text-sm md:text-base font-semibold">{order?.invoiceId}</h1>
                                                </div>
                                                <button className={`${order.status === "PENDING" ? "bg-red-100 text-red-700" : order.status === "PROCESSING" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"} text-[0.6rem] md:text-xs font-semibold px-5 py-1 rounded-full`}>{order.status}</button>
                                            </div>
                                            <div className="flex justify-between items-center border-b-[1px] pb-4">
                                                <div className="flex space-x-5">
                                                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                                                        <Image src={order.orderItems[0].images_url[0]} alt="outfit" width={100} height={100} className="" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h1 className="text-sm font-bold">{order.orderItems[0].title}</h1>
                                                        <div className="flex gap-2">
                                                            <button className="text-[0.6rem] md:text-xs text-gray-500 bg-graySecondary py-1 md:py-1.5 px-3 md:px-4 rounded-full">
                                                                {sizeDetails[order.orderItems[0].selectedSize] || ""}
                                                            </button>
                                                            <button className="text-[0.6rem] md:text-xs text-gray-500 bg-graySecondary py-1 md:py-1.5 px-3 md:px-4 rounded-full">{capitalizeWords(order.orderItems[0].selectedColor)}</button>
                                                        </div>
                                                        {/* <h1 className="text-sm font-bold md:hidden">Rp. {order.totalPrice.toLocaleString()}</h1> */}
                                                    </div>
                                                </div>
                                                <div className="hidden md:block">
                                                    <h1 className="font-semibold text-sm text-gray-700 text-right">Total Price</h1>
                                                    <h1 className="text-lg font-bold text-right">Rp. {order.totalPrice.toLocaleString()}</h1>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between md:justify-end pt-2">
                                                <h1 className="font-bold md:hidden">Rp. {order.totalPrice.toLocaleString()}</h1>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button disabled={order.status === "DONE" || order.status === "PENDING"} className={`text-[0.6rem] md:text-xs font-semibold py-2.5 px-4 md:px-6 bg-slate-900 text-white rounded-lg hover:bg-slate-700 ${order.status === "DONE" || order.status === "PENDING" ? "opacity-50 cursor-not-allowed" : ""}`}>Complete Order</button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will complete the order and the money will distribute to seller.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => completeOrder(order.id)}>{completeOrderIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md md:max-w-4xl">
                                        <DialogHeader>
                                            <DialogTitle>Order Detail</DialogTitle>
                                            <div className="flex justify-between pt-2">
                                                <p className="text-xs md:text-sm font-semibold">{order?.invoiceId}</p>
                                                <p className="text-[0.6rem] md:text-xs">{orderDate.toLocaleString().replace(/\.\d{3}$/, "")}</p>
                                            </div>
                                            <div className="flex justify-between items-center md:py-1">
                                                <h1 className="text-lg md:text-xl font-bold">{order?.customerInfo?.name}</h1>
                                                <button className={`${order.status === "PENDING" ? "bg-red-100 text-red-700" : order.status === "PROCESSING" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"} text-[0.6rem] md:text-xs font-semibold px-5 py-1 rounded-full`}>{order.status}</button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="p-4 border rounded-lg">
                                                    <div className="flex justify-between gap-6 md:gap-0">
                                                        <div className="space-y-4 text-left">
                                                            <div>
                                                                <h1 className="text-xs text-gray-500">Email</h1>
                                                                <h1 className="text-sm font-semibold">{order?.customerInfo?.email}</h1>
                                                            </div>
                                                            <div>
                                                                <h1 className="text-xs text-gray-500">Phone Number</h1>
                                                                <h1 className="text-sm font-semibold">{order?.customerInfo?.mobileNumber}</h1>
                                                            </div>
                                                        </div>
                                                        <div className="text-left">
                                                            <h1 className="text-xs text-gray-500">Address</h1>
                                                            <h1 className="text-sm font-semibold">{`${order?.customerInfo?.address}, ${order?.customerInfo?.city}, ${order?.customerInfo?.country}, ${order?.customerInfo?.zip}`}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="max-h-56 px-4 py-2 rounded-lg border overflow-y-scroll no-scrollbar">
                                                    {order?.orderItems?.map((item) => (
                                                        <div key={item.id} className="flex gap-4 py-2">
                                                            <div className="w-28 h-24 rounded-lg overflow-hidden bg-blue-300">
                                                                <Image src={item?.images_url[0]} alt="outfit" width={100} height={100} className="w-full h-full" />
                                                            </div>
                                                            <div className="flex w-full justify-between">
                                                                <div className="space-y-1">
                                                                    <div className="mb-2">
                                                                        <h1 className="text-left text-sm font-bold">{item?.title}</h1>
                                                                        <h1 className="text-left text-xs">{item?.user?.username}</h1>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <button disabled={true} className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full cursor-default">
                                                                            {sizeDetails[item?.selectedSize]}
                                                                        </button>
                                                                        <button disabled={true} className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full cursor-default">{capitalizeWords(item?.selectedColor)}</button>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h1 className="font-bold">Rp. {item?.price.toLocaleString()}</h1>
                                                                    <h1 className="text-sm text-right">{item?.productQty} Pcs</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between p-4 border rounded-lg">
                                                    <h1 className="text-sm md:text-base">Total Price</h1>
                                                    <h1 className="text-sm md:text-base font-bold">Rp. {order?.totalPrice.toLocaleString()}</h1>
                                                </div>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            )
                        })
                    }
                </div>
            </div>
        </TabsContent>
    )
}
