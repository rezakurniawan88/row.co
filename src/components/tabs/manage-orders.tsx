import { useMutation, useQuery } from "react-query";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TabsContent } from "../ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useUserStore from "@/stores/userStore";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { LucideCheckSquare, LucideLoader2, LucideTrash2 } from "lucide-react";
import { OrderProps } from "@/types/order-types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function ManageOrders() {
    const { userData } = useUserStore((state) => state);

    const { data: dataOrdersByBrand, refetch: refetchOrdersByBrand } = useQuery({
        queryKey: ["dataOrdersByBrandId", userData?.userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/orders/brand/${userData?.userId}`);
            return response?.data?.data;
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: acceptOrder, isLoading: acceptIsLoading } = useMutation({
        mutationKey: ['acceptOrderByBrand'],
        mutationFn: async (id) => {
            const response = await axiosInstance.patch(`/order/${id}`, { status: "PROCESSING" });
            return response?.data?.message
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchOrdersByBrand();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    return (
        <TabsContent value="manage-orders">
            <div className="mt-6 border p-8 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">Manage Orders</h1>
                        <p className="text-xs md:text-sm text-gray-400">Here you can manage your orders</p>
                    </div>
                </div>
                <ScrollArea>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataOrdersByBrand?.map((order: OrderProps, index: number) => (
                                <TableRow key={order.id}>
                                    <TableCell className="text-xs md:text-sm font-medium">{index + 1}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{order?.customerInfo?.name}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{`${order?.customerInfo?.address}, ${order?.customerInfo?.city}, ${order?.customerInfo?.country}`}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{order?.orderItems?.map((item) => (
                                        <h1 key={item.id}><span className="font-semibold mr-1">x{item.productQty}</span>{item.title}</h1>
                                    ))}</TableCell>
                                    <TableCell className="text-xs md:text-sm">Rp.{order?.totalPrice.toLocaleString()}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{order?.status}</TableCell>
                                    <TableCell className="space-y-1 md:space-y-0 md:space-x-2">
                                        <Tooltip>
                                            <AlertDialog>
                                                <TooltipTrigger asChild>
                                                    <AlertDialogTrigger asChild>
                                                        <button disabled={order.status === "PROCESSING" || order.status === "DONE" ? true : false} className={`bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700 ${order.status === "PROCESSING" || order.status === "DONE" ? "opacity-50 cursor-not-allowed" : ""}`}><LucideCheckSquare size={16} /></button>
                                                    </AlertDialogTrigger>
                                                </TooltipTrigger>
                                                <AlertDialogContent className="max-w-md md:max-w-xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will proccesing the order and save your data to our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => acceptOrder(order.id)}>{acceptIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <TooltipContent>
                                                <p className="text-xs font-light">Accept</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <AlertDialog>
                                                <TooltipTrigger asChild>
                                                    <AlertDialogTrigger asChild>
                                                        <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700"><LucideTrash2 size={16} /></button>
                                                    </AlertDialogTrigger>
                                                </TooltipTrigger>
                                                <AlertDialogContent className="max-w-md md:max-w-xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete and remove your data from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-red-500 hover:bg-red-600">Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <TooltipContent>
                                                <p className="text-xs font-light">Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </TabsContent>
    )
}
