import useCartStore from "@/stores/cartStore";
import { useState, useEffect} from "react";

export const useCartPrice = (carts) => {
    const [subTotal, setSubTotal] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState<number>(0);
    const tax = subTotal * 10 / 100;
    const { discount } = useCartStore((state) => state);
    console.log("state discount", discount);
    

    useEffect(() => {
        const getSubTotal = () => {
            const total = carts.reduce((acc, cart) => {
                return acc + cart.price * cart.productQty;
            }, 0)
            setSubTotal(total);
        }

        getSubTotal();
    }, [carts]);


    useEffect(() => {
        const getTotalPrice = () => {
            const totalPrice = subTotal + tax;
            const totalPriceDiscount = totalPrice > 0 ? totalPrice - discount : 0;

            setTotalPrice(totalPrice);
            setTotalPriceAfterDiscount(totalPriceDiscount);
        }

        getTotalPrice();
    }, [tax, subTotal, discount]);


    return { tax, subTotal, totalPrice, totalPriceAfterDiscount };
}