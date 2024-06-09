"use client"

import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import Image from "next/image"
import useFetchProducts from "@/hooks/products/useFetchProducts"
import { ProductProps } from "@/types/product-types"

export default function NewArrivalsPage() {
    const { data: dataProducts } = useFetchProducts();

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
                <h1 className="text-sm font-light hover:underline">New Arrivals</h1>
            </nav>

            <section className="flex flex-col justify-center items-center py-8 md:py-10 mx-10 md:mx-16">
                <div className="w-full">
                    <h1 className="text-3xl font-bold uppercase">New Arrivals</h1>
                </div>
                <div className="w-full my-8 md:my-12">
                    <div className="flex flex-wrap w-full h-full gap-6 md:gap-14">
                        {dataProducts?.map((product: ProductProps) => (
                            <Link key={product.id} href={`/detail/${product.slug}`} className="w-[47%] md:w-[20%]">
                                <div className="w-full md:w-64 h-full cursor-pointer">
                                    <div className="bg-grayCard w-full md:h-72 rounded-2xl overflow-hidden mb-4">
                                        <Image src={product.images_url[0]} alt="outfit" width={300} height={300} className="" />
                                    </div>
                                    <h1 className="text-sm md:text-base font-bold">{product.title.toUpperCase()}</h1>
                                    <Link href={`/brands/${product.user.slug}`}>
                                        <h1 className="text-xs font-semibold text-gray-500 hover:font-bold hover:text-gray-900">{product.user.username}</h1>
                                    </Link>
                                    <h1 className="text-sm md:text-xl font-bold mt-2">Rp. {product.price.toLocaleString()}</h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
