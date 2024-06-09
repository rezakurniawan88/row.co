import { axiosInstance } from "@/lib/axios";
import useUserStore from "@/stores/userStore";
import { useQuery } from "react-query";
import { useFetchAccessToken } from "../token/useFetchAccessToken";
import toast from "react-hot-toast";

export default function useFetchAddressByUserId() {
    const { data: dataToken } = useFetchAccessToken();
    const { userData } = useUserStore((state) => state);

  return useQuery({
    queryKey: ["getAddressByUserId", userData?.userId],
    queryFn: async () => {
        const result = await axiosInstance.get(`/addresses/${userData?.userId}`);

        return result?.data?.data;
    },
    enabled: !!dataToken,
    onError: (error) => {
        toast.error("Get Address Failed")
    }
  })
}
