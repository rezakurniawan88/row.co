"use client"

import Footer from "@/components/footer"
import InfoTips from "@/components/info-tips"
import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import useCartStore from "@/stores/cartStore"
import toast from "react-hot-toast"
import { useCartPrice } from "@/hooks/orders/useCartPrice"
import { useRef, useState } from "react"
import { LucideX } from "lucide-react"

export default function CartPage() {
    const { carts, deleteFromCart, discount, changeDiscount, resetDiscount } = useCartStore((state) => state);
    const { tax, subTotal, totalPrice, totalPriceAfterDiscount } = useCartPrice(carts);
    const couponRef = useRef();
    const [usedCouponCode, setUsedCouponCode] = useState<Array>([]);

    const deleteItem = (id: number) => {
        deleteFromCart(id);
        toast.success("Item deleted");
    };

    const deleteCoupon = () => {
        resetDiscount();
        toast.success("Coupon deleted");
    }

    const couponItem = [
        {
            couponCode: "DISCOUNT10K",
            discount: 10000
        },
        {
            couponCode: "DISCOUNT20K",
            discount: 20000
        },
        {
            couponCode: "DISCOUNT50K",
            discount: 50000
        }
    ];


    const useDiscountCoupon = (e) => {
        e.preventDefault();
        const couponValue = couponRef?.current?.value;
        const matchedCoupon = couponItem.find((coupon => coupon.couponCode === couponValue));

        if (matchedCoupon) {
            changeDiscount(matchedCoupon?.discount);
            setUsedCouponCode(matchedCoupon?.couponCode);
            console.log("matched", matchedCoupon?.discount);
            toast.success("Discount coupon applied");
        } else {
            toast.error("Invalid coupon");
        }
        console.log("coupon", couponValue);
    }

    console.log("carts", carts);

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
                <h1 className="text-sm font-light hover:underline">Carts</h1>
            </nav>
            <h1 className="pl-16 mt-8 text-3xl font-bold">Your Cart</h1>
            <section className="flex space-x-6 h-[26rem] mx-16 mt-6 mb-56 overflow-hidden">
                <div className="w-2/3 border rounded-xl px-6">
                    <div className="h-[25rem] overflow-y-scroll no-scrollbar">
                        {carts.length <= 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <h1 className="text-slate-600">There is no item</h1>
                            </div>
                        ) : carts.map((cart) => (
                            <>
                                <div className="flex justify-between py-5">
                                    <div className="flex space-x-5">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                                            <Image src={cart.images_url[0]} alt="outfit" width={100} height={100} className="" />
                                        </div>
                                        <div className="space-y-1">
                                            <h1 className="text-sm font-bold">{cart.title.toUpperCase()}</h1>
                                            <p className="text-xs text-gray-500">Size : {cart.selectedSize === "s" ? "Small" : cart.selectedSize === "m" ? "Medium" : cart.selectedSize === "l" ? "Large" : cart.selectedSize === "xl" ? "X-Large" : cart.selectedSize === "xxl" ? "2X-Large" : cart.selectedSize === "xxxl" ? "3X-Large" : ""}</p>
                                            <p className="text-xs text-gray-500">Color : {cart.selectedColor}</p>
                                            <h1 className="text-lg font-bold">Rp. {cart.price.toLocaleString()}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <button onClick={() => deleteItem(cart.id)} className="p-2 rounded-full hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                        </button>
                                        <div className="flex space-x-4 justify-center items-center bg-graySecondary rounded-full">
                                            <button className="p-1.5 rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg></button>
                                            <h1 className="text-sm">{cart.productQty}</h1>
                                            <button className="p-1.5 rounded-full hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                </div>
                <div className="w-2/6 p-5 border rounded-xl">
                    <h1 className="text-xl font-bold">Order Summary</h1>
                    <div className="flex flex-col space-y-2 my-6">
                        <div className="flex justify-between">
                            <h1 className="text-sm text-gray-500">Subtotal</h1>
                            <h1 className="font-bold">Rp. {subTotal.toLocaleString()}</h1>
                        </div>
                        <div className={`flex justify-between ${discount <= 0 && "hidden"}`}>
                            <h1 className="flex gap-1 text-sm text-gray-500">Discount <span className={usedCouponCode !== null ? "block" : "hidden"}>{`(${usedCouponCode})`}</span></h1>
                            <h1 className="text-red-500 font-bold">Rp. {discount.toLocaleString()}</h1>
                        </div>
                        <div className="flex justify-between">
                            <h1 className="text-sm text-gray-500">Tax Cost (10%)</h1>
                            <h1 className="font-bold">Rp. {tax.toLocaleString()}</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center my-4">
                        <h1 className="text-sm text-gray-500">Total</h1>
                        <div className="text-right">
                            <h1 className={`font-bold text-xs text-red-500 line-through ${discount <= 0 && "hidden"}`}>Rp. {totalPrice.toLocaleString()}</h1>
                            <h1 className="font-bold">Rp. {totalPriceAfterDiscount.toLocaleString()}</h1>
                        </div>
                    </div>
                    <div className="flex space-x-4 my-6">
                        <form onSubmit={useDiscountCoupon} className="w-full flex gap-1">
                            <div className="w-3/4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
                                    </div>
                                    <input type="text" ref={couponRef} name="discount" className="block w-full p-2.5 pl-10 text-xs text-gray-900 border rounded-full bg-[#f0f0f0] outline-none" placeholder="Add promo code" />
                                </div>
                            </div>
                            <button type="reset" onClick={deleteCoupon} className={`p-1 rounded-full hover:bg-slate-100 ${discount <= 0 && "hidden"}`}><LucideX color="red"></LucideX></button>
                            <button type="submit" className="text-white text-sm py-2 px-6 bg-black rounded-full hover:bg-gray-900">Apply</button>
                        </form>
                    </div>
                    <button className="flex gap-2 justify-center items-center w-full py-2.5 my-6 text-sm text-white bg-black rounded-full hover:bg-gray-900">Go To Checkout
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                    </button>
                </div>
            </section>
            <Footer />
        </main>
    )
}
