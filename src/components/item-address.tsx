import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import useDeleteAddress from "@/hooks/addresses/useDeleteAddress";
import useFetchAddressByAddressId from "@/hooks/addresses/useFetchAddressByAddressId";
import useFetchAddressByUserId from "@/hooks/addresses/useFetchAddressByUserId";
import { useAddressStore } from "@/stores/addressStore";
import { AddressProps } from "@/types/address-types";
import { LucideEdit2, LucideLoader2, LucideMapPin, LucideTrash } from "lucide-react"
import { useState } from "react";

type AddressItemProps = {
    selectedBorder: boolean;
}

function AddressItem({ selectedBorder }: AddressItemProps) {
    const { data: dataAddress } = useFetchAddressByUserId();
    const { mutate: getAddressByAddressId } = useFetchAddressByAddressId();
    const { mutate: onDelAddress, isLoading: deleteAddrIsLoading } = useDeleteAddress();
    const { setModalOpen, setEditMode, selectedAddress, setSelectedAddress } = useAddressStore((state) => state);
    const [addressIndex, setAddressIndex] = useState<number>(-1);

    const handleAddressSelect = (index: number) => {
        setSelectedAddress(dataAddress?.[index]);
        setAddressIndex(index);
    }

    return (
        <>
            {dataAddress?.length === 0 || dataAddress === undefined ? (
                <h1 className="text-center text-slate-600 my-10">Address Not Found</h1>
            ) : dataAddress?.map((address: AddressProps, index: number) => (
                <div key={address.id} onClick={selectedBorder ? () => handleAddressSelect(index) : null} className={`relative p-4 border space-y-1 rounded-lg cursor-pointer ${addressIndex === index ? "border border-black" : ""}`}>
                    <div className="absolute top-3 right-4 flex gap-1 items-center">
                        <button
                            onClick={() => {
                                getAddressByAddressId(address.id);
                                setModalOpen(true);
                                setEditMode(true);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 group"><LucideEdit2 size={16} className="text-gray-600 group-hover:text-gray-800" /></button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 group"><LucideTrash size={16} className="text-gray-600 group-hover:text-red-500" /></button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDelAddress(address.id)}>{deleteAddrIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Continue"}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <h1 className="font-semibold">{address.name}</h1>
                    <h1 className="text-xs md:text-sm text-gray-500">{`0${address.mobileNumber}`}</h1>
                    <div className="flex items-center gap-1">
                        <LucideMapPin size={18} className="text-gray-500" />
                        <h1 className="text-xs md:text-sm text-gray-500">{`${address.address}, ${address.city}, ${address.country}, ${address.zip}`}</h1>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AddressItem;