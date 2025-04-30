import {
  GET_PLAYER_BY_ID,
  GET_PLAYERS,
  GET_PLAYERS_HISTORY,
  PLAYER_QUERY_KEY,
  PLAYERS_HISTORY_QUERY_KEY,
} from "@/features/player/player.query";
import { gqlRequest } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";
import { Player, PlayerHistory, PlayerStatus } from "@workspace/api/qgl-types";

export const useGetPlayers = (status?: PlayerStatus) =>
  useQuery<{ players: Player[] }>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS, { status }),
    initialData: { players: [] },
  });

export const useGetPlayersHistory = () =>
  useQuery<{ players_history: PlayerHistory[] }>({
    queryKey: [PLAYERS_HISTORY_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS_HISTORY),
  });

export const useGetPlayerById = (id: string) =>
  useQuery<{ player: Player }>({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_BY_ID, { id }),
  });
