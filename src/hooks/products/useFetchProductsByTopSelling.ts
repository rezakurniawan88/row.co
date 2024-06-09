import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast";
import { useQuery } from "react-query"

function useFetchProductsByTopSelling() {
  return useQuery({
    queryKey: ["getProductsByTopSelling"],
    queryFn: async () => {
        const response = await axiosInstance.get("/products/top-selling");
        return response?.data?.data;
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  })
}

export default useFetchProductsByTopSelling;