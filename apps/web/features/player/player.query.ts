import { useMutation, useQuery } from "@tanstack/react-query";
import { Player } from "@workspace/api/qgl-types";
import {
  getPlayerById,
  getPlayers,
  updatePlayer,
} from "@/features/player/player.actions";

export const PLAYER_QUERY_KEY = "player";

export function useGetPlayers() {
  return useQuery<Player[]>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: getPlayers,
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

export function useUpdatePlayer(onSuccess?: () => void) {
  return useMutation({
    mutationFn: updatePlayer,
    onSuccess,
    retry: false,
  });
}
