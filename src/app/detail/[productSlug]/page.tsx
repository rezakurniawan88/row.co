"use client"

import InfoTips from "@/components/info-tips"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import useFetchSingleProduct from "@/hooks/products/useFetchSingleProduct"
import { useState } from "react"
import useCartStore from "@/stores/cartStore"
import toast from "react-hot-toast"
import useFetchProducts from "@/hooks/products/useFetchProducts"

export default function DetailPage({ params }) {
    const { data: dataProducts } = useFetchProducts();
    const { data: dataSingleProduct } = useFetchSingleProduct({ productSlug: params.productSlug });
    const { carts, addToCart } = useCartStore((state) => state);
    const [productQty, setProductQty] = useState<number>(1);
    console.log("qty", productQty);

    const [imageID, setImageID] = useState<number>(0);
    const [colorID, setColorID] = useState<number>(0);
    const [sizeID, setSizeID] = useState<number>(0);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");


    const changeSelectedColor = (index, color) => {
        setColorID(index);
        setSelectedColor(color)
    }

    const changeSelectedSize = (index, size) => {
        setSizeID(index);
        setSelectedSize(size)
    }

    const addItemToCart = (id: number) => {
        const selectedItem = dataProducts?.find((product) => product.id === id);
        console.log("dataProduct", dataProducts);
        console.log("selectedItem", selectedItem);

        if (carts.some((product) => product.id === id)) {
            toast.error("Product already in the cart");
            return;
        }

        const itemWithQty = { ...selectedItem, productQty, selectedColor, selectedSize };

        addToCart(itemWithQty);
        toast.success("Product successfully added");
    }

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
                    {dataSingleProduct?.images_url.map((imageURL, index) => (
                        <div onClick={() => setImageID(index)} id="images" key={index} className={`${imageID === index && "border border-black"} rounded-lg overflow-hidden cursor-pointer`}>
                            <Image src={imageURL} alt="outfit" width={300} height={300} className="" />
                        </div>
                    ))}
                </div>
                <div id="img" className="flex justify-center bg-grayCard w-2/5 h-full overflow-hidden rounded-2xl">
                    <Image src={dataSingleProduct?.images_url[imageID]} alt="outfit" width={500} height={500} className="" />
                </div>
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">{dataSingleProduct?.title || ""}</h1>
                    <h1 className="text-xl font-bold">Rp. {dataSingleProduct?.price.toLocaleString() || 0}</h1>
                    <p className="text-sm text-gray-500">{dataSingleProduct?.description || ""}</p>
                    <hr />
                    <h3 className="text-sm font-medium text-gray-500">Select Colors</h3>
                    <div className="flex space-x-3">
                        {dataSingleProduct?.colors.map((color, index) => (
                            <button onClick={() => changeSelectedColor(index, color)} key={color} style={{ backgroundColor: `${color === "army" ? "#4B5320" : color}` }} className={`w-6 h-6 rounded-full cursor-pointer ${colorID === index && "border border-black"} ${color === "white" && colorID !== index ? "border-2 border-slate-300" : ""}`}></button>
                        ))}
                    </div>
                    <hr />
                    <h3 className="text-sm font-medium text-gray-500">Choose Size</h3>
                    <div className="flex space-x-2">
                        {dataSingleProduct?.sizes.map((size, index) => (
                            <button onClick={() => changeSelectedSize(index, size)} key={size} className={`text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full hover:text-gray-800 hover:border hover:border-slate-500 ${sizeID === index && "border border-slate-500 text-gray-800"}`}>{size === "s" ? "Small" : size === "m" ? "Medium" : size === "l" ? "Large" : size === "xl" ? "X-Large" : size === "xxl" ? "2X-Large" : size === "xxxl" ? "3X-Large" : ""}</button>
                        ))}
                    </div>
                    <hr />
                    <div className="flex space-x-5">
                        <div className="flex space-x-6 justify-center items-center w-[20%] bg-graySecondary rounded-full">
                            <button onClick={() => setProductQty((prev) => {
                                if (prev > 1) {
                                    return prev - 1;
                                }
                                return prev;
                            })} className="p-2 rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg></button>
                            <h1>{productQty || 1}</h1>
                            <button onClick={() => setProductQty((prev) => prev + 1)} className="p-2 rounded-full hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                            </button>
                        </div>
                        <button onClick={() => addItemToCart(dataSingleProduct?.id)} className="w-3/4 text-white text-sm font-bold bg-black py-3 rounded-full hover:bg-gray-900">Add to Cart</button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
