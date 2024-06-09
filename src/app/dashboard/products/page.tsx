"use client"

import NavbarDashboard from "@/components/dashboard/navbar-dashboard";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { axiosInstance } from "@/lib/axios";
import { LucideEdit, LucideLoader2, LucidePlus, LucideTrash2 } from "lucide-react";
import Link from "next/link";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useFetchAccessToken } from "@/hooks/token/useFetchAccessToken";
import LoadingPage from "@/components/ui/loading";
import useFetchProductsByUserId from "@/hooks/products/useFetchProductsByUserId";
import { ProductProps } from "@/types/product-types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { capitalizeWords } from "@/lib/utils";

export default function ProductsPage() {
    const { isLoading: loadingToken } = useFetchAccessToken();
    const { data: dataProducts, isLoading, refetch: refetchProduct } = useFetchProductsByUserId();

    const deleteProductHandler = async (id: number) => {
        const response = await axiosInstance.delete(`/product/${id}`);
        return response?.data?.message;
    }

    const { mutate: deleteProduct, isLoading: deleteIsLoading } = useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: deleteProductHandler,
        onSuccess: (data) => {
            toast.success(data);
            refetchProduct();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    return (
        <main className="relative h-screen">
            <NavbarDashboard />
            <SidebarDashboard />
            <div className="p-4 sm:ml-64">
                <div className="flex items-center justify-between p-4 mt-14">
                    <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
                    <Link href="/dashboard/products/create">
                        <button className="font-medium bg-blue-500 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700 hidden md:block">+ Create Product</button>
                    </Link>
                </div>
                <Link href="/dashboard/products/create">
                    <button className="absolute bottom-5 right-5 bg-blue-500 text-white p-4 text-xs md:text-sm rounded-full hover:bg-blue-700 md:hidden"><LucidePlus /></button>
                </Link>

                <ScrollArea>
                    <Table className="relative shadow-md sm:rounded-lg mt-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Colors</TableHead>
                                <TableHead>Sizes</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataProducts?.map((product: ProductProps, index: number) => (
                                <TableRow key={product.id}>
                                    <TableCell className="text-xs md:text-sm font-medium">{index + 1}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{product.title}</TableCell>
                                    <TableCell className="text-xs md:text-sm">Rp.{product.price.toLocaleString()}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{capitalizeWords(product.category)}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{capitalizeWords(product.colors.join(', '))}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{product.sizes.join(', ').toUpperCase()}</TableCell>
                                    <TableCell className="space-y-1 md:space-y-0 md:space-x-2">
                                        <Link href={`/dashboard/products/update/${product.slug}`}>
                                            <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700"><LucideEdit size={16} /></button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700"><LucideTrash2 size={16} /></button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="max-w-md md:max-w-xl">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => deleteProduct(product.id)}>{deleteIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>

                        {isLoading && <h1>Loading...</h1>}
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {loadingToken ? (<LoadingPage />) : null}
        </main>
    )
}
