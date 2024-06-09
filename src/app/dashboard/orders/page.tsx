"use client"

import NavbarDashboard from "@/components/dashboard/navbar-dashboard";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { LucideCheck, LucideCheckSquare, LucideLoader2, LucideTrash2 } from "lucide-react";
import { useFetchAccessToken } from "@/hooks/token/useFetchAccessToken";
import LoadingPage from "@/components/ui/loading";
import { useFetchOrders } from "@/hooks/orders/useFetchOrders";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { OrderProps } from "@/types/order-types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function OrdersPage() {
    const { isLoading: loadingToken } = useFetchAccessToken();
    const { data: dataOrders, refetch: refetchOrders } = useFetchOrders();

    const { mutate: acceptOrder, isLoading: acceptIsLoading } = useMutation({
        mutationKey: ['acceptOrder'],
        mutationFn: async (id) => {
            const response = await axiosInstance.patch(`/order/${id}`, { status: "PROCESSING" });
            return response?.data?.message
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchOrders();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    const { mutate: doneOrder, isLoading: doneIsLoading } = useMutation({
        mutationKey: ['doneOrder'],
        mutationFn: async (id) => {
            const response = await axiosInstance.patch(`/order/${id}`, { status: "DONE" });
            return response?.data?.message
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchOrders();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    const { mutate: deleteOrder, isLoading: deleteIsLoading } = useMutation({
        mutationKey: ['deleteOrder'],
        mutationFn: async (id) => {
            const response = await axiosInstance.delete(`/order/${id}`);
            return response?.data?.message
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchOrders();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });


    return (
        <main>
            <TooltipProvider>
                <NavbarDashboard />
                <SidebarDashboard />

                <div className="p-4 sm:ml-64">
                    <div className="flex justify-between p-4 mt-14">
                        <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
                    </div>

                    <ScrollArea className="mb-10">
                        <Table className="relative shadow-md sm:rounded-lg mt-6">
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
                                {dataOrders?.map((order: OrderProps, index: number) => (
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
                                                                This action cannot be undone. This will accept order and save the data to our servers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-blue-500 hover:bg-blue-600" onClick={() => acceptOrder(order.id)}>{acceptIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
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
                                                            <button disabled={order.status === "DONE" ? true : false} className={`bg-green-500 p-2 text-white rounded-md hover:bg-green-700 ${order.status === "DONE" && "opacity-50 cursor-not-allowed"}`}><LucideCheck size={16} /></button>
                                                        </AlertDialogTrigger>
                                                    </TooltipTrigger>
                                                    <AlertDialogContent className="max-w-md md:max-w-xl">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will done your order and save your data to our servers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-green-500 hover:bg-green-600" onClick={() => doneOrder(order.id)}>{doneIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                                <TooltipContent>
                                                    <p className="text-xs font-light">Done</p>
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
                                                            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => deleteOrder(order.id)}>{deleteIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
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

                {loadingToken ? (<LoadingPage />) : null}
            </TooltipProvider>
        </main>
    )
}
