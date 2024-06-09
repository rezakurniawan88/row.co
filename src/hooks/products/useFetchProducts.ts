import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const useFetchProducts = () => {
    return useQuery({ 
        queryKey: ['getProducts'],
        queryFn: async () => {
            const response = await axiosInstance.get("/products?page=1&limit=5");
            return response?.data?.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })
}

export default useFetchProducts;