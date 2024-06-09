import { axiosInstance } from "@/lib/axios";
import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import useUserStore from "@/stores/userStore";

export const useFetchAccessToken = () => {
    const { setUserData } = useUserStore((state) => state);

    return useQuery({
        queryKey: ["refreshToken"],
        queryFn: async () => {
            const response = await axiosInstance.get("/auth/refresh-token");
            const decoded = jwtDecode(response?.data?.data?.accessToken);
            setUserData(decoded);
            
            return response?.data?.data?.accessToken;
        },
        onError: (error) => {
            console.log(error);
        }
    })
}