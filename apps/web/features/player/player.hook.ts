import {
  GET_PLAYER_BY_ID,
  GET_PLAYERS,
  PLAYER_QUERY_KEY,
} from "@/features/player/player.query";
import { gqlRequest } from "@/utils/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Player } from "@workspace/api/qgl-types";

export const useGetPlayers = () =>
  useSuspenseQuery<{ players: Player[] }>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS),
  });

export const useGetPlayerById = (id: string) =>
  useSuspenseQuery<{ player: Player }>({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_BY_ID, { id }),
  });
