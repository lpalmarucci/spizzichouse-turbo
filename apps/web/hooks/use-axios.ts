import { useAuth } from "@clerk/nextjs";
import { axios } from "@/api/axios";

export function useAxios() {
  const { getToken } = useAuth();

  axios.interceptors.request.use(async (config) => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axios;
}
