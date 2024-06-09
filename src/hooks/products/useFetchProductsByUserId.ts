import { axiosInstance } from "@/lib/axios";
import { useQuery } from "react-query";
import { useFetchAccessToken } from "../token/useFetchAccessToken";
import toast from "react-hot-toast";
import useUserStore from "@/stores/userStore";

const useFetchProductsByUserId = () => { 
    const { data: dataToken } = useFetchAccessToken();
    const { userData } = useUserStore((state) => state);

    return useQuery({
        queryKey: ["getProductsByUserId", userData?.userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/dashboard/products/${userData?.userId}`, {
                headers: {
                    "Authorization": `Bearer ${dataToken}`
                }
            });
            return response?.data?.data;
        },
        enabled: !!dataToken,
        onError: (error) => {
            toast.error("Error");
        }
    })
}

export default useFetchProductsByUserId;