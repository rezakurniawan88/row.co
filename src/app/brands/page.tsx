"use client"

import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import { useQuery } from "react-query"
import { axiosInstance } from "@/lib/axios"
import Image from "next/image"
import { DataBrandProps } from "@/types/brand-types"

export default function BrandsPage() {
    const { data: dataBrands } = useQuery({
        queryKey: ["dataBrands"],
        queryFn: async () => {
            const response = await axiosInstance.get("/auth/users/brands");
            return response?.data?.data
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

            <section className="flex flex-col justify-center items-center py-8 md:py-10 mx-10 md:mx-16">
                <div className="w-full">
                    <h1 className="text-3xl font-bold uppercase">BRANDS</h1>
                </div>
                <div className="flex flex-col md:flex-row gap-8 w-full my-6 md:my-12">
                    {dataBrands?.map((brand: DataBrandProps) => (
                        <Link key={brand.id} href={`/brands/${brand.slug}`}>
                            <div className="flex justify-center items-center w-full md:w-56 h-32 border rounded-xl cursor-pointer hover:bg-slate-50">
                                <div className="flex gap-4">
                                    <Image src={brand.profile_picture_url} width={50} height={50} alt="brand_picture" className="w-12 h-12 rounded-full border overflow-hidden" />
                                    <div>
                                        <h1 className="text-xl font-bold">{brand.username}</h1>
                                        <h1 className="text-xs font-medium text-gray-500">{brand?.products?.length > 0 ? `${brand?.products?.length} Products` : "No Products"}</h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
