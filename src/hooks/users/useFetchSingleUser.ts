import { useMutation, useQuery } from 'react-query'
import { axiosInstance } from '@/lib/axios';
import useUserStore from '@/stores/userStore';

export default function useFetchSingleUser() {
  const { setDataUserById } = useUserStore((state) => state);

  return useMutation({
    mutationKey: ["dataSingleUser"],
        mutationFn: async (userSlug) => {
            const response = await axiosInstance.get(`/auth/users/${userSlug}`);
            setDataUserById(response?.data?.data);
            return response?.data?.data;
        },
        onError: (error) => {
            console.log(error);
        }
  })
}
