import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export function useLogout() {
    const router = useRouter();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            const response = await axiosInstance.delete("auth/logout");
            return response.data.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            router.push("/auth/login");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })
}