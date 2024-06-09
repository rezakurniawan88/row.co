import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useFetchAddressByUserId from "./useFetchAddressByUserId";

export default function useDeleteAddress() {
    const { refetch: refetchAddress } = useFetchAddressByUserId();

  return useMutation({
    mutationKey: ['deleteAddress'],
    mutationFn: async (addressId) => {
      const response = await axiosInstance.delete(`/address/${addressId}`);
      return response?.data?.message;
    },
    onSuccess: (data) => {
      toast.success(data);
      refetchAddress();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });
}