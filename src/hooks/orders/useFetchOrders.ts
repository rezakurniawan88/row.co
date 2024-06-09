import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast";
import { useQuery } from "react-query"

export const useFetchOrders = () => {
    return useQuery({
        queryKey: ["getOrders"],
        queryFn: async () => {
            const response = await axiosInstance.get("/orders");
            return response?.data?.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })
}