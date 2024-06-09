"use client"

import Header from "@/components/ui/header"
import InfoTips from "@/components/ui/info-tips"
import Image from "next/image"
import ContainerImage from "../../public/img/homepage.jpg"
import VersaceLogo from "../../public/img/brands/versace-icon.png"
import ZaraLogo from "../../public/img/brands/zara-icon.png"
import GucciLogo from "../../public/img/brands/gucci-icon.png"
import PradaLogo from "../../public/img/brands/prada-icon.png"
import CalvinKleinLogo from "../../public/img/brands/calvin-icon.png"
import MenImage from "../../public/img/man.jpg"
import WomenImage from "../../public/img/women.jpg"
import KidsImage from "../../public/img/kids.jpg"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import useFetchProducts from "@/hooks/products/useFetchProducts"
import CardSkeleton from "@/components/skeleton/card-skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Testimony from "@/components/testimony"
import useFetchProductsByTopSelling from "@/hooks/products/useFetchProductsByTopSelling"
import { ProductProps } from "@/types/product-types"

export default function Homepage() {
  const { data: dataProducts, isLoading: productIsLoading } = useFetchProducts();
  const { data: dataTopSelling, isLoading: topSellingIsLoading } = useFetchProductsByTopSelling();

  return (
    <main className="overflow-x-hidden">
      <InfoTips />
      <Header />
      <section className="homepage-container w-full h-full items-center justify-center relative">
        <div className="w-full absolute flex flex-col justify-center pl-10 md:pl-20 h-full bg-opacity-50">
          <h1 className="text-xl md:text-4xl font-bold text-white">Discover 2024 Fashion Trends</h1>
          <p className="font-semibold text-xs text-white md:text-base leading-6 mt-1 mb-3 md:mt-3 md:mb-6">Your new look is just a click away.</p>
          <Link href="/explore" className="flex items-center justify-center w-28 md:w-36 py-3 bg-black text-white text-xs md:text-sm font-semibold hover:bg-white hover:border hover:border-black hover:text-black">
            <button className="flex gap-2 items-center">Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </button>
          </Link>
        </div>
        <Image src={ContainerImage} alt="container-image" width={0} height={0} sizes="100vw" />
      </section>

      <section className="flex justify-center md:gap-28 md:py-20 gap-8 py-10">
        <Image src={VersaceLogo} alt="versace-logo" width={90} height={90} className="opacity-50 w-10 md:w-24" />
        <Image src={ZaraLogo} alt="zara-logo" width={90} height={90} className="opacity-50 w-10 md:w-24" />
        <Image src={GucciLogo} alt="gucci-logo" width={90} height={90} className="opacity-50 w-10 md:w-24" />
        <Image src={PradaLogo} alt="prada-logo" width={90} height={90} className="opacity-50 w-10 md:w-24" />
        <Image src={CalvinKleinLogo} alt="calvin-klein-logo" width={90} height={90} className="opacity-50 w-10 md:w-24" />
      </section>

      <section className="flex flex-col justify-center items-center px-10 py-4 md:py-10 md:px-16">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-bold uppercase">New Arrivals</h1>
          <Link href="/new-arrivals">
            <button className="text-xs md:text-sm font-semibold border px-6 py-2 md:px-8 rounded-full">View all</button>
          </Link>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full my-6 md:my-12">
          <CarouselContent className="w-52 md:w-80 space-x-4">
            {dataProducts?.map((product: ProductProps, index: number) => (
              <CarouselItem key={index} className="h-full">
                <Link key={product.id} href={`/detail/${product.slug}`}>
                  <div className="bg-grayCard h-52 md:h-80 rounded-2xl overflow-hidden mb-4">
                    <Image src={product.images_url[0]} alt="outfit" width={300} height={300} className="hover:scale-105" />
                  </div>
                  <h1 className="font-bold text-xs md:text-base">{product.title.toUpperCase()}</h1>
                  <Link href={`/brands/${product.user.slug}`}>
                    <h1 className="text-xs font-semibold text-gray-500 hover:font-bold hover:text-gray-900">{product.user.username}</h1>
                  </Link>
                  <h1 className="text-sm md:text-xl font-bold mt-2">Rp. {product.price.toLocaleString()}</h1>
                </Link>
              </CarouselItem>
            ))}

            {productIsLoading ? (<CardSkeleton />) : null}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <hr className="w-full mt-5 md:mt-16" />
      </section>

      <section className="flex flex-col justify-center items-center pt-3 md:pt-5 pb-10 px-10 md:px-16">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl md:text-3xl font-bold uppercase">Top Selling</h1>
          <Link href="/top-selling">
            <button className="text-xs md:text-sm font-semibold border px-6 py-2 md:px-8 rounded-full">View all</button>
          </Link>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full my-6 md:my-12">
          <CarouselContent className="w-52 md:w-80 space-x-4">
            {dataTopSelling?.map((product: ProductProps, index: number) => (
              <CarouselItem key={index} className="h-full">
                <Link key={product.id} href={`/detail/${product.slug}`}>
                  <div className="bg-grayCard h-52 md:h-80 rounded-2xl overflow-hidden mb-4">
                    <Image src={product.images_url[0]} alt="outfit" width={300} height={300} className="hover:scale-105" />
                  </div>
                  <h1 className="font-bold text-xs md:text-base">{product.title.toUpperCase()}</h1>
                  <Link href={`/brands/${product.user.slug}`}>
                    <h1 className="text-xs font-semibold text-gray-500 hover:font-bold hover:text-gray-900">{product.user.username}</h1>
                  </Link>
                  <div className="flex justify-between items-center">
                    <h1 className="text-sm md:text-xl font-bold mt-2">Rp. {product.price.toLocaleString()}</h1>
                  </div>
                </Link>
              </CarouselItem>
            ))}

            {topSellingIsLoading ? (<CardSkeleton />) : null}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>


      <section className="py-5 md:py-10 px-6 md:px-16">
        <h1 className="text-xl md:text-3xl font-bold uppercase text-center">Browse By Category</h1>
        <div className="flex gap-5 md:gap-10 my-8 md:my-16">
          <div className="relative w-[50%] md:w-[30%] overflow-hidden group cursor-pointer">
            <Link href="/explore?category=men">
              <Image src={MenImage} alt="man-image" width={0} height={0} className="w-full h-full group-hover:scale-110" />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
                <button className="absolute bottom-4 left-4 md:bottom-5 md:left-5 flex gap-2 items-center justify-center bg-black px-4 md:px-6 py-2 md:py-3 text-white text-[0.6rem] md:text-xs font-bold hover:bg-white hover:border hover:border-black hover:text-black">Men`s
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                </button>
              </div>
            </Link>
          </div>
          <div className="relative w-[50%] md:w-[30%] overflow-hidden group cursor-pointer">
            <Link href="/explore?category=women">
              <Image src={WomenImage} alt="man-image" width={0} height={0} className="w-full h-full group-hover:scale-110" />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
                <button className="absolute bottom-4 left-4 md:bottom-5 md:left-5 flex gap-2 items-center justify-center bg-black px-4 md:px-6 py-2 md:py-3 text-white text-[0.6rem] md:text-xs font-bold hover:bg-white hover:border hover:border-black hover:text-black">Women`s
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                </button>
              </div>
            </Link>
          </div>
          <div className="relative w-[50%] md:w-[30%] overflow-hidden group cursor-pointer">
            <Link href="/explore?category=kids">
              <Image src={KidsImage} alt="man-image" width={0} height={0} className="w-full h-full group-hover:scale-110" />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
                <button className="absolute bottom-4 left-4 md:bottom-5 md:left-5 flex gap-2 items-center justify-center bg-black px-4 md:px-6 py-2 md:py-3 text-white text-[0.6rem] md:text-xs font-bold hover:bg-white hover:border hover:border-black hover:text-black">Kid`s
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Testimony />

      <Footer />
    </main>
  )
}
