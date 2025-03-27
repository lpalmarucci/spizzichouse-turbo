import { getAxiosInstance } from "@/api/axios";
import { Player } from "@workspace/db";

export async function getPlayers() {
  const axios = await getAxiosInstance();
  const response = await axios.get("/players");
  console.log(response.data);
  return response.data;
}

export async function getPlayerById(id: string) {
  const axios = await getAxiosInstance();
  const response = await axios.get<Player>(`/players/${id}`);
  console.log(response.data);
  return response.data;
}
