"use client"

import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import { LucideMail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useQuery } from "react-query"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { ProductProps } from "@/types/product-types"

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
    const router = useRouter();

    const { data: dataBrand } = useQuery({
        queryKey: ["dataBrand", params.slug],
        queryFn: async () => {
            const response = await axiosInstance.get(`/auth/users/${params.slug}`);
            return response?.data?.data;
        },
        onSuccess: (data) => {
            if (data === null) {
                router.push("/");
            }
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return (
        <main>
            <InfoTips />
            <Header />
            <nav className="flex space-x-2 items-center mx-10 md:mx-16 mt-8">
                <Link href="/">
                    <h1 className="text-sm font-light hover:underline">Home</h1>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <h1 className="text-sm font-light hover:underline">Brands</h1>
            </nav>

            <section className="flex flex-col justify-center items-center py-10 mx-10 md:mx-16 mb-28 md:mb-0 space-y-6">
                <div className="flex flex-col justify-center items-center w-full border rounded-lg p-6 gap-2">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border overflow-hidden">
                        {dataBrand?.profile_picture_url === null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full object-cover rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        ) : (
                            <Image src={dataBrand?.profile_picture_url} width={200} height={200} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
                        )}
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold">{dataBrand?.username}</h1>
                    <div className="flex gap-2">
                        <LucideMail className="text-gray-500" />
                        <p>{dataBrand?.email}</p>
                    </div>
                </div>
                <Tabs
                    defaultValue="products"
                    className="w-full">
                    <TabsList className="w-full bg-transparent border justify-start py-6 px-4">
                        <TabsTrigger value="products" className="data-[state=active]:bg-stone-100">Products</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                        <div className="mt-6 border p-8 rounded-lg">
                            <div className="mb-6">
                                <h1 className="text-xl md:text-2xl font-bold">All Products</h1>
                                <p className="text-xs md:text-sm text-gray-400">List all products are here</p>
                            </div>
                            <div className="flex flex-wrap gap-5 md:gap-7 w-full">
                                {dataBrand?.products?.length <= 0 ? (
                                    <div className="w-full">
                                        <h1 className="text-center text-slate-600 my-10">No Products</h1>
                                    </div>
                                ) :
                                    dataBrand?.products?.map((product: ProductProps) => (
                                        <Link key={product.id} href={`/detail/${product.slug}`}>
                                            <div className="w-[45%] md:w-64 md:h-full rounded-2xl cursor-pointer">
                                                <div className="bg-grayCard w-full h-full md:w-64 md:h-64 rounded-2xl overflow-hidden mb-4">
                                                    <Image src={product.images_url[0]} alt="outfit" width={200} height={200} className="w-full h-full" />
                                                </div>
                                                <h1 className="text-xs md:text-sm font-semibold">{product.title}</h1>
                                                <h1 className="text-sm md:text-base font-bold">Rp. {product.price.toLocaleString()}</h1>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
            <Footer />
        </main>
    )
}
