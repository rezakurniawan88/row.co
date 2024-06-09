import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { TabsContent } from "../ui/tabs";
import { axiosInstance } from "@/lib/axios";
import useUserStore from "@/stores/userStore";
import Link from "next/link";
import Image from "next/image";
import ModalAddProduct from "../modal/modal-add-product";
import ModalUpdateProduct from "../modal/modal-update-product";
import useProductStore from "@/stores/productStore";
import { ProductProps } from "@/types/product-types";
import { LucideLoader2, LucideTrash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import toast from "react-hot-toast";

export default function ListProducts() {
    const [modalAddOpen, setModalAddOpen] = useState<boolean>(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);
    const { userData } = useUserStore((state) => state);
    const { productSlug, setProductSlug } = useProductStore((state) => state);

    const { data: dataProducts, refetch: refetchProducts } = useQuery({
        queryKey: ["dataProductsByUserId", userData?.userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/products/${userData?.userId}`);
            return response?.data?.data;
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { mutate: onDeleteProduct, isLoading: deleteProductIsLoading } = useMutation({
        mutationKey: ["deleteProduct"],
        mutationFn: async (productId) => {
            const response = await axiosInstance.delete(`/product/${productId}`);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchProducts();
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return (
        <TabsContent value="products">
            <div className="mt-6 border p-8 rounded-lg">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">All Products</h1>
                        <p className="text-xs md:text-sm text-gray-400">List all products are here</p>
                    </div>
                    <ModalAddProduct modalOpen={modalAddOpen} setModalOpen={setModalAddOpen} refetchProducts={refetchProducts} />
                </div>
                <div className="flex flex-wrap gap-7">
                    {dataProducts?.map((product: ProductProps) => (
                        <div key={product.id} className="relative w-[45%] md:w-64 h-full rounded-2xl cursor-pointer">
                            <div className="flex flex-col md:flex-row gap-2 absolute top-2 right-2">
                                <ModalUpdateProduct modalOpen={modalUpdateOpen} setModalOpen={setModalUpdateOpen} refetchProducts={refetchProducts} slug={() => setProductSlug(product.slug)} />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="bg-white p-2 text-red-500 rounded-full hover:bg-slate-100 z-30"><LucideTrash size={14} /></button>
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
                                            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => onDeleteProduct(product.id)}>{deleteProductIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            <Link href={`/detail/${product.slug}`}>
                                <div className="bg-grayCard w-full md:w-64 md:h-64 rounded-2xl overflow-hidden mb-4">
                                    <Image src={product?.images_url[0]} alt="outfit" width={200} height={200} className="w-full h-full" />
                                </div>
                                <h1 className="text-sm font-semibold">{product?.title}</h1>
                                <h1 className="font-bold">Rp. {product?.price.toLocaleString()}</h1>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </TabsContent>
    )
}
