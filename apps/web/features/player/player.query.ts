import { useQuery } from "@tanstack/react-query";
import { Player } from "@workspace/db";
import { getPlayerById, getPlayers } from "@/features/player/player.actions";
import { ResponseError } from "@/lib/types";

export const PLAYER_QUERY_KEY = "player";

export function useGetPlayers() {
  return useQuery<Player[] | ResponseError>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => getPlayers(),
  });
}

export function useGetPlayerById(id: string) {
  return useQuery<Player | ResponseError>({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => getPlayerById(id),
  });
}
