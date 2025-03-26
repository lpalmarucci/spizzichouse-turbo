import { getAxiosInstance } from "@/api/axios";

export async function getPlayers() {
  const axios = await getAxiosInstance();
  const response = await axios.get("/players");
  return response.data;
}
