import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast";
import { useQuery } from "react-query"
import { useFetchAccessToken } from "../token/useFetchAccessToken";

export const useFetchUsers = () => {
    const { data: dataToken } = useFetchAccessToken();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axiosInstance.get("/auth/users", {
                headers: {
                    "Authorization": `Bearer ${dataToken}`
                }
            });
            return response?.data?.data;
        },
        enabled: !!dataToken,
        onError: (error) => {
            toast.error(error.response?.data?.message);
        }
    })
}