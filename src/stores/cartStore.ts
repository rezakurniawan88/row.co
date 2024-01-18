import { create } from "zustand"

type TCartStore = {
    carts: [];
    addToCart: (selectedItem) => void;
    deleteFromCart: (id: number) => void;
    resetCart: () => void;
    discount: number;
    changeDiscount: (discount) => void;
    resetDiscount: () => void;
}

const useCartStore = create<TCartStore>((set) => ({
    carts: [],
    addToCart: (selectedItem) => set((state) => ({ carts: [...state.carts, selectedItem ]})),
    deleteFromCart: (id: number) => set((state) => ({ carts: state.carts.filter((product) => product.id !== id) })),
    resetCart: () => 
    set(() => ({carts: []})),
    discount: 0,
    changeDiscount: (discount) => set(() => ({discount})),
    resetDiscount: () => set(() => ({discount: 0}))
}))

export default useCartStore;