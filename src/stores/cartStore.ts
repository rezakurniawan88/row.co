import { CartItemProps } from "@/types/carts-types";
import { create } from "zustand"

type TCartStore = {
    carts: CartItemProps[];
    addToCart: (selectedItem: CartItemProps) => void;
    handleQuantity: (id: number, qty: number) => void;
    deleteFromCart: (id: number) => void;
    resetCart: () => void;
    discount: number;
    changeDiscount: (discount: number) => void;
    resetDiscount: () => void;
    usedCouponCode: Array<string>;
    setUsedCouponCode: (couponCode: Array<string>) => void;
}

const useCartStore = create<TCartStore>((set) => ({
    carts: [],
    addToCart: (selectedItem) => set((state) => ({ carts: [...state.carts, selectedItem ]})),
    handleQuantity: (id, qty) =>
        set((state) => {
        const updatedCarts = state.carts.map((cart) =>
            cart.id === id
            ? {
                ...cart,
                productQty: Math.max(0, cart.productQty + qty),
                }
            : cart
        );
    
        const itemToDelete = updatedCarts.find((cart) => cart.id === id);
        if (itemToDelete?.productQty === 0) {
            return {
            carts: updatedCarts.filter((cart) => cart.id !== id),
            };
        }
    
        return { carts: updatedCarts };
    }),
    deleteFromCart: (id: number) => set((state) => ({ carts: state.carts.filter((product) => product.id !== id) })),
    resetCart: () => set(() => ({carts: []})),
    discount: 0,
    changeDiscount: (discount) => set(() => ({discount})),
    resetDiscount: () => set(() => ({discount: 0})),
    usedCouponCode: [],
    setUsedCouponCode: (couponCode) => set({ usedCouponCode: couponCode }),
}))

export default useCartStore;