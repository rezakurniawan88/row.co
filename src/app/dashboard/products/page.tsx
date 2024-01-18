"use client"

import NavbarDashboard from "@/components/dashboard/navbar-dashboard";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { axiosInstance } from "@/lib/axios";
import { LucideEdit, LucideLoader2, LucideTrash2 } from "lucide-react";
import Link from "next/link";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import useFetchProducts from "@/hooks/products/useFetchProducts";

export default function ProductsPage() {
    const { data: dataProducts, isLoading, refetch: refetchProduct } = useFetchProducts();
    console.log("products", dataProducts);


    const deleteProductHandler = async (id) => {
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
        <main>
            <NavbarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="flex justify-between p-4 mt-14">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Link href="/dashboard/products/create">
                        <button className="font-medium bg-blue-500 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700">+ Create Product</button>
                    </Link>
                </div>



                <Table className="relative shadow-md sm:rounded-lg mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            {/* <TableHead>Description</TableHead> */}
                            <TableHead>Category</TableHead>
                            <TableHead>Colors</TableHead>
                            <TableHead>Sizes</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataProducts?.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>Rp.{product.price.toLocaleString()}</TableCell>
                                {/* <TableCell>{product.description}</TableCell> */}
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.colors.join(', ')}</TableCell>
                                <TableCell>{product.sizes.join(', ')}</TableCell>
                                <TableCell className="space-x-2">
                                    <Link href={`/dashboard/products/update/${product.id}`}>
                                        <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700"><LucideEdit size={16} /></button>
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700"><LucideTrash2 size={16} /></button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteProduct(product.id)}>{deleteIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
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


            </div>
        </main>
    )
}
