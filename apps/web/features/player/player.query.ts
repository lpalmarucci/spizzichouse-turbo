import { useMutation, useQuery } from "@tanstack/react-query";
import { Player } from "@workspace/db";
import {
  getPlayerById,
  getPlayers,
  updatePlayer,
} from "@/features/player/player.actions";
import { ResponseError } from "@/lib/types";

export const PLAYER_QUERY_KEY = "player";

export function useGetPlayers() {
  return useQuery<Player[] | ResponseError>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: getPlayers,
    retry: false,
  });
}

export function useGetPlayerById(id: string) {
  return useQuery<Player>({
    enabled: !!id,
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: async ({ queryKey }) => {
      const [_, playerId] = queryKey;
      return getPlayerById(playerId as string);
    },
    retry: false,
  });
}

export function useUpdatePlayer(id: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: updatePlayer,
    onSuccess,
    retry: false,
  });
}
