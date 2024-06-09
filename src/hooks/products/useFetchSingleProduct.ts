import { axiosInstance } from "@/lib/axios";
import { useQuery } from "react-query";

const useFetchSingleProduct = ({ productSlug }: { productSlug: string }) => {
    return useQuery({
        queryKey: ["getSingleProduct", productSlug],
        queryFn: async () => {
            const response = await axiosInstance.get(`/product/${productSlug}`);
            return response?.data?.data;
        },
    })
}

export default useFetchSingleProduct;