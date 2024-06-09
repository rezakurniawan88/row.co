import { create } from "zustand";

type TProductStore = {
    productQty: number;
    decreaseProductQty: () => void;
    increaseProductQty: () => void;
    resetProductQty: () => void;
    productSlug: string;
    setProductSlug: (productSlug: string) => void;
}

const useProductStore = create<TProductStore>((set) => ({
    productQty: 1,
    decreaseProductQty: () => set((state) => ({productQty: state.productQty > 1 ? state.productQty - 1 : state.productQty})),
    increaseProductQty: () => set((state) => ({productQty: state.productQty + 1})),
    resetProductQty: () => set({productQty: 1}),
    productSlug: "",
    setProductSlug: (productSlug: string) => set({productSlug})
}))

export default useProductStore;