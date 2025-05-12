import {
  GET_PLAYER_BY_ID,
  GET_PLAYERS,
  GET_PLAYERS_HISTORY,
  GET_PLAYERS_STATS,
  PLAYER_QUERY_KEY,
  PLAYERS_HISTORY_QUERY_KEY,
  PLAYERS_STATS_QUERY_KEY,
} from "@/features/player/player.query";
import { gqlRequest } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";
import {
  Player,
  PlayerHistory,
  PlayerStats,
  PlayerStatus,
} from "@workspace/api/qgl-types";

export const useGetPlayers = (status?: PlayerStatus) =>
  useQuery<{ players: Player[] }>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS, { status }),
    initialData: { players: [] },
  });

export const useGetPlayersStats = () =>
  useQuery<{ players_stats: PlayerStats[] }>({
    queryKey: [PLAYERS_STATS_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS_STATS),
    initialData: { players_stats: [] },
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
