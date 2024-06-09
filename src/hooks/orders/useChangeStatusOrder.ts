import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useFetchOrders } from "./useFetchOrders";

type ChangeStatusOrderProps = {
    id: number;
    statusChange: string;
}

export default function useChangeStatusOrder() {
    const { refetch: refetchOrders } = useFetchOrders();

  return useMutation({
    mutationKey: ['changeStatusOrder'],
        mutationFn: async (params: ChangeStatusOrderProps) => {
            const { id, statusChange } = params;
            const response = await axiosInstance.patch(`/order/${id}`, { status: statusChange });
            return response?.data?.message
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchOrders();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
  })
}
