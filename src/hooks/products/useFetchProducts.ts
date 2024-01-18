import { axiosInstance } from "@/lib/axios";
import { useQuery } from "react-query";

const useFetchProducts = () => {
    return useQuery({ 
        queryKey: ['getProducts'],
        queryFn: async () => {
            const response = await axiosInstance.get("/products");
            return response?.data?.data;
        }
    })
}

export default useFetchProducts;