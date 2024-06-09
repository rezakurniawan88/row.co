import { AddressProps } from "@/types/address-types";
import { create } from "zustand";

type TAddressStore = {
    modalOpen: boolean;
    setModalOpen: (data: boolean) => void;
    editMode: boolean;
    setEditMode: (data: boolean) => void;
    dataAddressById: AddressProps,
    setDataAddressById: (data: AddressProps) => void;
    selectedAddress: AddressProps,
    setSelectedAddress: (data: AddressProps) => void;
}

export const useAddressStore = create<TAddressStore>((set) => ({
    modalOpen: false,
    setModalOpen: (data) => set({ modalOpen: data}),
    editMode: false,
    setEditMode: (data) => set({ editMode: data}),
    dataAddressById: {
        id: 0,
        userId: 0,
        name: "",
        address: "",
        email: "",
        city: "",
        country: "",
        mobileNumber: "",
        zip: ""
    },
    setDataAddressById: (data) => set({ dataAddressById: data }),
    selectedAddress: {
        id: 0,
        userId: 0,
        name: "",
        address: "",
        email: "",
        city: "",
        country: "",
        mobileNumber: "",
        zip: ""
    },
    setSelectedAddress: (data) => set({ selectedAddress: data })
}))