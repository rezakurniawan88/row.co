import { axiosInstance } from "@/lib/axios";
import { useAddressStore } from "@/stores/addressStore";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useFetchAddressByAddressId() {
  const { setDataAddressById } = useAddressStore((state) => state);

  return useMutation({
    mutationKey: ["fetchAddressByAddressId"],
    mutationFn: async (addressId) => {
      const response = await axiosInstance.get(`/address/${addressId}`);
      setDataAddressById(response?.data?.data);
      return response?.data?.data;
    },
    onError: () => {
      toast.error("Error fetching address data");
    }
  });
}