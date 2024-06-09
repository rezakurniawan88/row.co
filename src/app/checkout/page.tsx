"use client"

import Footer from "@/components/ui/footer"
import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Link from "next/link"
import { useCartPrice } from "@/hooks/orders/useCartPrice"
import useCartStore from "@/stores/cartStore"
import Image from "next/image"
import { useMutation } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { axiosInstance } from "@/lib/axios"
import { LucideLoader2 } from "lucide-react"
import useUserStore from "@/stores/userStore"
import ModalAddress from "@/components/modal/modal-address"
import AddressItem from "@/components/item-address"
import { useAddressStore } from "@/stores/addressStore"
import { sizeDetails } from "@/lib/data-items"
import { capitalizeWords } from "@/lib/utils"
import { CartItemProps } from "@/types/carts-types"

export default function CheckoutPage() {
    const { carts, discount, usedCouponCode, resetCart } = useCartStore((state) => state);
    const { tax, subTotal, totalPrice, totalPriceAfterDiscount } = useCartPrice(carts);
    const router = useRouter();
    const { userData } = useUserStore((state) => state);
    const { selectedAddress } = useAddressStore((state) => state);

    const handleOrder = () => {
        if (Object.keys(userData).length === 0) {
            toast.error("Please login first");
            return;
        }

        if (carts.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        if (Object.keys(selectedAddress).length === 0) {
            toast.error("Please select an address");
            return;
        }

        onOrder();
    }


    const { mutate: onOrder, isLoading: orderIsLoading } = useMutation({
        mutationKey: ['createOrder', userData?.userId],
        mutationFn: async () => {
            const orderData = {
                customerInfo: selectedAddress,
                orderItems: carts,
                subTotal: subTotal,
                totalPrice: discount ? totalPrice : totalPriceAfterDiscount,
                userId: userData?.userId
            }

            const response = await axiosInstance.post("/order", orderData);
            return response.data.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            resetCart();
            router.push("/");
        },
        onError: (error) => {
            console.log("error", error);
            toast.error(error.response.data.message);
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
                <h1 className="text-sm font-light hover:underline">Checkout</h1>
            </nav>
            <h1 className="ml-10 md:ml-16 mt-8 text-3xl font-bold">Checkout</h1>
            <section className="flex flex-col md:flex-row gap-5 md:gap-0 md:space-x-6 mx-10 md:mx-16 mt-6 mb-56 overflow-hidden">
                <div className="w-full md:w-3/5 border rounded-xl p-8">
                    <h1 className="text-xl font-bold">Address</h1>
                    <p className="text-sm text-gray-500 mt-1 mb-5">Select your address for delivery</p>
                    <div className="space-y-4 max-h-screen overflow-y-scroll no-scrollbar">
                        <AddressItem selectedBorder={true} />
                    </div>
                    <ModalAddress widthBtn={"w-full"} />
                </div>
                <div className="w-full md:w-2/5 p-8 border rounded-xl">
                    <h1 className="text-xl font-bold">Order Summary</h1>

                    <div className="h-[25rem] overflow-y-scroll no-scrollbar">
                        {carts.length <= 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <h1 className="text-slate-600">There is no item</h1>
                            </div>
                        ) : carts.map((cart: CartItemProps) => (
                            <>
                                <div className="flex justify-between py-5">
                                    <div className="flex space-x-5">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                                            <Image src={cart.images_url[0]} alt="outfit" width={100} height={100} className="" />
                                        </div>
                                        <div className="space-y-1">
                                            <h1 className="text-sm font-bold">{cart.title.toUpperCase()}</h1>
                                            <div className="flex gap-2">
                                                <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">
                                                    {sizeDetails[cart.selectedSize] || ""}
                                                </button>
                                                <button className="text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full">{capitalizeWords(cart.selectedColor)}</button>
                                            </div>
                                            <h1 className="text-lg font-bold">Rp. {cart.price.toLocaleString()}</h1>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>

                    <div className="flex flex-col space-y-2 md:my-6">
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
                    <button onClick={() => handleOrder()} className="flex gap-2 justify-center items-center w-full py-2.5 my-6 text-sm text-white bg-black rounded-full hover:bg-gray-900">{orderIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : (
                        <div className="flex gap-1">
                            <h1>Order Now</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                        </div>
                    )}
                    </button>
                </div>
            </section>
            <Footer />
        </main>
    )
}
