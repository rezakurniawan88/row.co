import InfoTips from "@/components/InfoTips"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import Outfit1 from "@/../public/img/outfit1.png"

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
                <h1 className="text-sm font-light hover:underline">Explore</h1>
            </nav>
            <section className="flex space-x-3 mx-16 mt-8 mb-40">
                <div className="w-1/4 h-full p-4 border rounded-xl">
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-bold">Filters</h1>
                        <button className="p-1 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" /></svg>
                        </button>
                    </div>
                    <hr className="my-4" />
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">T-shirts</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">Shorts</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">Shirts</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">Hoodie</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">Jeans</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div>
                        <h1 className="text-sm font-bold">Price</h1>
                        <form className="flex justify-center items-center space-x-3 mt-2">
                            <div className="w-1/2">
                                <label htmlFor="min-price" className="text-xs text-gray-500 font-medium">Min</label>
                                <input type="number" name="min-price" id="min-price" className="w-full p-2.5 mt-1 text-xs text-gray-900 font-medium border rounded-lg bg-gray-50 outline-none" placeholder="Min price" />
                            </div>
                            <hr className="w-3.5 border-gray-400 rounded-full border-[0.5px] mt-6" />
                            <div className="w-1/2">
                                <label htmlFor="max-price" className="text-xs text-gray-500 font-medium">Max</label>
                                <input type="number" name="max-price" id="max-price" className="w-full p-2.5 mt-1 text-xs text-gray-900 font-medium border rounded-lg bg-gray-50 outline-none" placeholder="Max price" />
                            </div>
                        </form>
                    </div>
                    <hr className="my-4" />
                    <div>
                        <h1 className="text-sm font-bold">Colors</h1>
                        <div className="flex items-center flex-wrap gap-4 mt-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-red-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-yellow-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-orange-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-sky-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-blue-700 rounded-full border"></div>
                            <div className="w-10 h-10 bg-purple-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-pink-500 rounded-full border"></div>
                            <div className="w-10 h-10 bg-white rounded-full border"></div>
                            <div className="w-10 h-10 bg-black rounded-full border"></div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div>
                        <h1 className="text-sm font-bold">Size</h1>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">Small</button>
                            <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">Medium</button>
                            <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">Large</button>
                            <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">X-Large</button>
                            <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">XX-Large</button>
                            <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">3X-Large</button>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div>
                        <h1 className="text-sm font-bold">Dress Style</h1>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-xs text-gray-500">Casual</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">Formal</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">Party</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">Sport</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-3 mt-4 text-xs font-medium text-white bg-black rounded-full hover:bg-gray-900">Apply Filter</button>
                </div>
                <div className="w-3/4 px-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Explore</h1>
                        <p className="text-xs text-gray-500">Showing 1-10 of 100 Products</p>
                    </div>
                    <div className="flex flex-wrap gap-6 py-6">
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                        <Link href="/detail">
                            <div className="w-[17rem] h-full cursor-pointer">
                                <div className="bg-grayCard w-full h-[17rem] rounded-2xl overflow-hidden mb-4">
                                    <Image src={Outfit1} alt="outfit" width={300} height={300} className="" />
                                </div>
                                <h1 className="font-semibold">T-SHIRT WITH TAPE DETAILS</h1>
                                <h1 className="text-xl font-bold">Rp. 100.000</h1>
                            </div>
                        </Link>
                    </div>
                    <hr className="my-6" />
                    <div className="flex justify-between items-center">
                        <button className="border flex gap-2 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                            Previous</button>
                        <div className="flex gap-2">
                            <button className="bg-graySecondary flex justify-center items-center w-6 h-6 p-2 rounded-md text-[0.65rem] font-medium">1</button>
                            <button className="flex justify-center items-center w-6 h-6 p-2 rounded-md text-[0.65rem] font-medium text-gray-500 hover:bg-graySecondary">2</button>
                            <button className="flex justify-center items-center w-6 h-6 p-2 rounded-md text-[0.65rem] font-medium text-gray-500 hover:bg-graySecondary">3</button>
                            <button className="flex justify-center items-center w-6 h-6 p-2 rounded-md text-[0.65rem] font-medium text-gray-500 hover:bg-graySecondary">4</button>
                            <button className="flex justify-center items-center w-6 h-6 p-2 rounded-md text-[0.65rem] font-medium text-gray-500 hover:bg-graySecondary">5</button>
                        </div>
                        <button className="border flex gap-2 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            Next</button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
