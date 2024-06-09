"use client"

import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Image from "next/image"
import Link from "next/link"
import useFetchSingleProduct from "@/hooks/products/useFetchSingleProduct"
import { useEffect, useState } from "react"
import useCartStore from "@/stores/cartStore"
import toast from "react-hot-toast"
import useFetchProducts from "@/hooks/products/useFetchProducts"
import useProductStore from "@/stores/productStore"
import { ProductProps } from "@/types/product-types"

export default function DetailPage({ params }: { params: { productSlug: string } }) {
    const { data: dataProducts } = useFetchProducts();
    const { data: dataSingleProduct } = useFetchSingleProduct({ productSlug: params.productSlug });
    const { carts, addToCart } = useCartStore((state) => state);
    const { productQty, increaseProductQty, decreaseProductQty, resetProductQty } = useProductStore((state) => state);
    const [imageID, setImageID] = useState<number>(0);
    const [colorID, setColorID] = useState<number>(0);
    const [sizeID, setSizeID] = useState<number>(0);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");


    const changeSelectedColor = (index: number, color: string) => {
        setColorID(index);
        setSelectedColor(color)
    }

    const changeSelectedSize = (index: number, size: string) => {
        setSizeID(index);
        setSelectedSize(size)
    }

    const addItemToCart = (id: number) => {
        const selectedItem = dataProducts?.find((product: ProductProps) => product.id === id);

        if (carts.some((product: ProductProps) => product.id === id)) {
            toast.error("Product already in the cart");
            return;
        }

        const itemWithQty = { ...selectedItem, productQty, selectedColor, selectedSize };

        addToCart(itemWithQty);
        resetProductQty();
        toast.success("Product successfully added");
    }

    useEffect(() => {
        setSelectedColor(dataSingleProduct?.colors[0]);
        setSelectedSize(dataSingleProduct?.sizes[0]);
    }, [dataSingleProduct])

    return (
        <main className="overflow-x-hidden">
            <InfoTips />
            <Header />
            <nav className="flex space-x-2 items-center mx-10 md:mx-16 mt-8">
                <Link href="/">
                    <h1 className="text-sm font-light hover:underline">Home</h1>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <h1 className="text-sm font-light hover:underline">Detail Product</h1>
            </nav>
            <section className="flex flex-col md:flex-row gap-10 w-full mx-10 md:mx-16 mt-10 mb-36 md:mb-56 overflow-hidden">
                <div className="flex flex-col md:flex-row w-full md:w-[40%] gap-6 md:gap-10">
                    <div className="flex flex-row md:flex-col md:space-y-6 gap-5 md:gap-0 justify-center items-center w-5/6 md:w-[25%] h-full order-1">
                        {dataSingleProduct?.images_url.map((imageURL: string, index: number) => (
                            <div onClick={() => setImageID(index)} id="images" key={index} className={`${imageID === index && "border border-black"} w-36 md:w-full h-32 md:h-full rounded-lg overflow-hidden cursor-pointer`}>
                                <Image src={imageURL} alt="outfit" width={300} height={300} className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                    <div id="img" className="flex justify-center bg-grayCard w-5/6 md:w-[75%] h-full overflow-hidden rounded-2xl md:order-1">
                        <Image src={dataSingleProduct?.images_url[imageID]} alt="image-outfit" width={500} height={500} className="w-full" />
                    </div>
                </div>
                <div className="flex flex-col w-5/6 md:w-[45%] space-y-4">
                    <h1 className="text-xl md:text-3xl font-bold">{dataSingleProduct?.title || ""}</h1>
                    <div className="flex justify-between items-center">
                        <div>
                            <Link href={`/brands/${dataSingleProduct?.user?.slug}`}>
                                <div className="flex items-center gap-2">
                                    <Image src={dataSingleProduct?.user?.profile_picture_url || ""} width={30} height={30} alt="brand_picture" className="w-7 h-7 rounded-full border overflow-hidden" />
                                    <h1 className="text-sm md:text-base font-semibold text-gray-500 hover:font-bold hover:text-gray-900">{dataSingleProduct?.user?.username || ""}</h1>
                                </div>
                            </Link>
                        </div>
                        <div className="mr-6">
                            <h1 className="text-xs md:text-sm">{dataSingleProduct?.productSold} Sold</h1>
                        </div>

                    </div>
                    <h1 className="text-xl font-bold md:hidden">Rp. {dataSingleProduct?.price.toLocaleString() || 0}</h1>
                    <p className="text-xs md:text-sm text-gray-500">{dataSingleProduct?.description || ""}</p>
                    <hr />
                    <h3 className="text-sm font-medium text-gray-500">Select Colors</h3>
                    <div className="flex space-x-3">
                        {dataSingleProduct?.colors.map((color: string, index: number) => (
                            <button onClick={() => changeSelectedColor(index, color)} key={color} style={{ backgroundColor: `${color === "army" ? "#4B5320" : color}` }} className={`w-8 h-8 rounded-full cursor-pointer ${colorID === index && "border-[3px] border-slate-400"} ${color === "white" && colorID !== index ? "border-2 border-slate-300" : ""}`}></button>
                        ))}
                    </div>
                    <hr />
                    <h3 className="text-sm font-medium text-gray-500">Choose Size</h3>
                    <div className="flex space-x-2">
                        {dataSingleProduct?.sizes.map((size: string, index: number) => (
                            <button onClick={() => changeSelectedSize(index, size)} key={size} className={`text-xs text-gray-500 bg-graySecondary py-2 px-5 rounded-full hover:border hover:border-slate-500 ${sizeID === index && "bg-slate-900 text-white"}`}>{size === "s" ? "Small" : size === "m" ? "Medium" : size === "l" ? "Large" : size === "xl" ? "X-Large" : size === "xxl" ? "2X-Large" : size === "xxxl" ? "3X-Large" : ""}</button>
                        ))}
                    </div>
                    <hr />
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-4 w-full">
                            <h1 className="text-xl font-bold hidden md:block">Rp. {dataSingleProduct?.price.toLocaleString() || 0}</h1>
                            <div className="flex gap-6 justify-center items-center  bg-graySecondary rounded-full">
                                <button onClick={decreaseProductQty} className="p-2 rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg></button>
                                <h1>{productQty || 1}</h1>
                                <button onClick={increaseProductQty} className="p-2 rounded-full hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                                </button>
                            </div>
                            <button onClick={() => addItemToCart(dataSingleProduct?.id)} className="w-full md:w-1/2 px-10 text-white text-sm font-bold bg-black py-3 rounded-full hover:bg-gray-900">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
