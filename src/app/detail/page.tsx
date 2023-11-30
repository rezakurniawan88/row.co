import InfoTips from "@/components/InfoTips"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import Outfit1 from "@/../public/img/outfit1.png"
import Link from "next/link"

export default function page() {
    return (
        <main>
            <InfoTips />
            <Header />
            <nav className="flex space-x-2 items-center mx-16 mt-8">
                <Link href="/">
                    <h1 className="text-sm font-light hover:underline">Home</h1>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <h1 className="text-sm font-light hover:underline">Detail Product</h1>
            </nav>
            <section className="flex space-x-6 h-[26rem] mx-16 mt-10 mb-56 overflow-hidden">
                <div className="flex flex-col space-y-3 justify-center items-center w-[14%] h-full">
                    <div className="border border-black rounded-lg overflow-hidden">
                        <Image src={Outfit1} alt="outfit" width={0} height={0} className="" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={Outfit1} alt="outfit" width={0} height={0} className="" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={Outfit1} alt="outfit" width={0} height={0} className="" />
                    </div>
                </div>
                <div className="flex justify-center w-2/5 h-full overflow-hidden rounded-2xl">
                    <Image src={Outfit1} alt="outfit" width={0} height={0} className="" />
                </div>
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">T-SHIRT WITH TAPE DETAILS</h1>
                    <h1 className="text-xl font-bold">Rp. 100.000</h1>
                    <p className="text-sm text-gray-500">This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>
                    <hr />
                    <h3 className="text-sm font-medium text-gray-500">Select Colors</h3>
                    <div className="flex space-x-3">
                        <button className="w-6 h-6 bg-black rounded-full"></button>
                        <button className="w-6 h-6 bg-blue-500 rounded-full"></button>
                        <button className="w-6 h-6 bg-green-500 rounded-full"></button>
                    </div>
                    <hr />
                    <h3 className="text-sm font-medium text-gray-500">Choose Size</h3>
                    <div className="flex space-x-2">
                        <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">Small</button>
                        <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">Medium</button>
                        <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">Large</button>
                        <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">X-Large</button>
                    </div>
                    <hr />
                    <div className="flex space-x-5">
                        <div className="flex space-x-6 justify-center items-center w-[20%] bg-graySecondary rounded-full">
                            <button className="p-2 rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg></button>
                            <h1>1</h1>
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                            </button>
                        </div>
                        <button className="w-3/4 text-white text-sm font-bold bg-black py-3 rounded-full hover:bg-gray-900">Add to Cart</button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
