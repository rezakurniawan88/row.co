import Header from "@/components/header"
import InfoTips from "@/components/info-tips"
import Image from "next/image"
import ContainerImage from "../../public/img/homepage.jpg"
import VersaceLogo from "../../public/img/brands/versace-icon.png"
import ZaraLogo from "../../public/img/brands/zara-icon.png"
import GucciLogo from "../../public/img/brands/gucci-icon.png"
import PradaLogo from "../../public/img/brands/prada-icon.png"
import CalvinKleinLogo from "../../public/img/brands/calvin-icon.png"
import Outfit1 from "../../public/img/outfit1.png"
import Outfit2 from "../../public/img/outfit2.png"
import Outfit3 from "../../public/img/outfit3.png"
import Outfit4 from "../../public/img/outfit4.png"
import MenImage from "../../public/img/man.jpg"
import WomenImage from "../../public/img/women.jpg"
import KidsImage from "../../public/img/kids.jpg"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <InfoTips />
      <Header />
      <section className="homepage-container w-full h-full items-center justify-center relative">
        <div className="w-full absolute flex flex-col justify-center pl-10 md:pl-20 h-full bg-opacity-50">
          <h1 className="text-xl md:text-4xl font-bold text-white">Discover 2023 Fashion Trends</h1>
          <p className="font-semibold text-xs text-white md:text-base leading-6 mt-1 mb-3 md:mt-3 md:mb-6">Your new look is just a click away.</p>
          <button className="flex gap-2 items-center justify-center bg-black w-28 md:w-36 py-3 text-white text-xs sm:text-sm font-semibold hover:bg-white hover:border hover:border-black hover:text-black">Shop Now
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
          </button>
        </div>
        <Image src={ContainerImage} alt="container-image" width={0} height={0} sizes="100vw" />
      </section>

      <section className="flex justify-center gap-28 py-20">
        <Image src={VersaceLogo} alt="versace-logo" width={90} height={90} className="opacity-50" />
        <Image src={ZaraLogo} alt="zara-logo" width={90} height={90} className="opacity-50" />
        <Image src={GucciLogo} alt="gucci-logo" width={90} height={90} className="opacity-50" />
        <Image src={PradaLogo} alt="prada-logo" width={90} height={90} className="opacity-50" />
        <Image src={CalvinKleinLogo} alt="calvin-klein-logo" width={90} height={90} className="opacity-50" />
      </section>

      <section className="flex flex-col justify-center items-center py-10 px-16">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold uppercase">New Arrivals</h1>
          <button className="text-sm font-semibold border py-2 px-8 rounded-full">View all</button>
        </div>
        <div className="flex w-full my-12 overflow-x-scroll no-scrollbar">
          <div className="flex space-x-4">
            <Link href="/detail">
              <div className="w-80 h-full cursor-pointer">
                <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                  <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                </div>
                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                <h1 className="text-xl font-bold">Rp. 100.000</h1>
              </div>
            </Link>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit2} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit3} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit4} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit3} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
          </div>
        </div>
        <hr className="w-full mt-16" />
      </section>

      <section className="flex flex-col justify-center items-center pt-5 pb-10 px-16">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold uppercase">Top Selling</h1>
          <button className="text-sm font-semibold border py-2 px-8 rounded-full">View all</button>
        </div>
        <div className="flex w-full my-12 overflow-x-scroll no-scrollbar">
          <div className="flex space-x-4">
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit3} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit2} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit4} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
            <div className="w-80 h-full cursor-pointer">
              <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
                <Image src={Outfit3} alt="outfit" width={300} height={300} className="" />
              </div>
              <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
              <h1 className="text-xl font-bold">Rp. 100.000</h1>
            </div>
          </div>
        </div>
      </section>


      {/* <section className="flex flex-col justify-center items-center py-10 px-16 border-b-[1px] border-slate-400">
        <h1 className="text-3xl font-black text-center">TOP SELLING</h1>
        <div className="flex gap-4 my-16">
          <div>
            <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
              <Image src={Outfit3} alt="outfit" width={300} height={300} className="" />
            </div>
            <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
            <h1 className="text-xl font-bold">Rp. 100.000</h1>
          </div>
          <div>
            <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
              <Image src={Outfit2} alt="outfit" width={300} height={240} className="" />
            </div>
            <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
            <h1 className="text-xl font-bold">Rp. 100.000</h1>
          </div>
          <div>
            <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
              <Image src={Outfit4} alt="outfit" width={300} height={300} className="" />
            </div>
            <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
            <h1 className="text-xl font-bold">Rp. 100.000</h1>
          </div>
          <div>
            <div className="bg-grayCard w-full h-80 rounded-2xl overflow-hidden mb-6">
              <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
            </div>
            <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
            <h1 className="text-xl font-bold">Rp. 100.000</h1>
          </div>
        </div>
        <button className="w-40 text-sm font-semibold border py-2 px-10 rounded-full">View all</button>
      </section> */}

      <section className="py-10 px-16">
        <h1 className="text-3xl font-bold uppercase text-center">Browse By Category</h1>
        <div className="flex gap-10 my-16">
          <div className="relative w-[30%] overflow-hidden group cursor-pointer">
            <Image src={MenImage} alt="man-image" width={0} height={0} className="w-full h-full group-hover:scale-110" />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
              <button className="absolute bottom-5 left-5 flex gap-2 items-center justify-center bg-white px-6 py-3 text-black text-xs font-bold hover:bg-gray-200">Men`s
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </button>
            </div>
          </div>
          <div className="relative w-[30%] overflow-hidden group cursor-pointer">
            <Image src={WomenImage} alt="man-image" width={0} height={0} className="w-full h-full group-hover:scale-110" />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
              <button className="absolute bottom-5 left-5 flex gap-2 items-center justify-center bg-white px-6 py-3 text-black text-xs font-bold hover:bg-gray-200">Women`s
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </button>
            </div>
          </div>
          <div className="relative w-[30%] overflow-hidden group cursor-pointer">
            <Image src={KidsImage} alt="man-image" width={0} height={0} className="w-full h-full group-hover:scale-110" />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
              <button className="absolute bottom-5 left-5 flex gap-2 items-center justify-center bg-white px-6 py-3 text-black text-xs font-bold hover:bg-gray-200">Kid`s
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-16 overflow-hidden">
        <h1 className="text-3xl font-bold uppercase text-center">OUR HAPPY CUSTOMERS</h1>
        <div className="flex gap-10 my-16">
          <div className="w-80 p-6 border border-black border-opacity-10 rounded-xl">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold">Sarah M.</h1>
              <div className="flex justify-center items-center bg-blue-400 w-4 h-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check text-white"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</p>
          </div>
          <div className="w-80 p-6 border border-black border-opacity-10 rounded-xl">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold">Sarah M.</h1>
              <div className="flex justify-center items-center bg-blue-400 w-4 h-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check text-white"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</p>
          </div>
          <div className="w-80 p-6 border border-black border-opacity-10 rounded-xl">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold">Sarah M.</h1>
              <div className="flex justify-center items-center bg-blue-400 w-4 h-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check text-white"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</p>
          </div>
          <div className="w-80 p-6 border border-black border-opacity-10 rounded-xl">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold">Sarah M.</h1>
              <div className="flex justify-center items-center bg-blue-400 w-4 h-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check text-white"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
