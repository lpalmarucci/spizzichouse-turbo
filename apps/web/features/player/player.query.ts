import { useQuery } from "@tanstack/react-query";
import { Player } from "@workspace/types";
import { getPlayers } from "@/features/player/player.actions";

export const PLAYER_QUERY_KEY = "player";

export function useGetPlayers() {
  return useQuery<Player[]>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => getPlayers(),
  });
}
