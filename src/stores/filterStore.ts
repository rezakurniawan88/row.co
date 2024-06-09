import { create } from "zustand";

type FilterDataProps = {
    type: string;
    minPrice: string;
    maxPrice: string;
    sortPriceValue: string;
    selectedColor: string;
    selectedSize: string;
    style: string;
}

type TFilterStore = {
    filterData: FilterDataProps;
    setFilterData: (data: FilterDataProps) => void;
}

export const useFilterStore = create<TFilterStore>((set) => ({
    filterData: {
        type: "",
        minPrice: "",
        maxPrice: "",
        sortPriceValue: "",
        selectedColor: "",
        selectedSize: "",
        style: ""
    },
    setFilterData: (data) => set({ filterData: data })
}))