import {
  GET_PLAYER_BY_ID,
  GET_PLAYER_STATS,
  GET_PLAYERS,
  GET_PLAYERS_HISTORY,
  GET_PLAYERS_STATS,
  PLAYER_QUERY_KEY,
  PLAYERS_HISTORY_QUERY_KEY,
  PLAYERS_STATS_QUERY_KEY,
  UPDATE_PLAYER,
} from '@/features/player/player.query';
import { gqlRequest } from '@/utils/query';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Player, PlayerStats, PlayerStatus, UpdatePlayer } from '@workspace/api/qgl-types';

export const useGetPlayers = (status?: PlayerStatus) =>
  useQuery<{ players: Player[] }>({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS, { status }),
    initialData: { players: [] },
  });

export const useGetPlayersStats = () =>
  useSuspenseQuery<{ playersWithStats: PlayerStats[] }>({
    queryKey: [PLAYERS_STATS_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS_STATS),
  });

export const useGetPlayerStats = (id: string) =>
  useSuspenseQuery<{ playerWithStats: PlayerStats }>({
    queryKey: [PLAYERS_STATS_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_STATS, { id }),
  });

export const useGetPlayersHistory = () =>
  useQuery<{ players_history: PlayerHistory[] }>({
    queryKey: [PLAYERS_HISTORY_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS_HISTORY),
  });

export const useGetPlayerById = (id: string) =>
  useSuspenseQuery<{ player: Player }>({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_BY_ID, { id }),
  });
export const useUpdatePlayer = () =>
  useMutation({
    mutationKey: [PLAYER_QUERY_KEY],
    mutationFn: ({ id, player }: { id: string; player: UpdatePlayer }) => gqlRequest(UPDATE_PLAYER, { id, player }),
  });
