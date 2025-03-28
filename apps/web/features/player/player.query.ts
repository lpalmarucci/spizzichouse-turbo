import { useMutation, useQuery } from "@tanstack/react-query";
import { Player } from "@workspace/db";
import {
  getPlayerById,
  getPlayers,
  updatePlayer,
} from "@/features/player/player.actions";

export const PLAYER_QUERY_KEY = "player";

export function useGetPlayers() {
  return useQuery<Player[]>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => getPlayers(),
  });
}

export function useGetPlayerById(id: string) {
  return useQuery<Player>({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => getPlayerById(id),
  });
}

export function usePatchPlayer(id: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: updatePlayer,
    onSuccess,
  });
}
