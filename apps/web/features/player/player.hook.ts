import { useMutation, useQuery, useSuspenseQuery } from "@apollo/client";
import {
  GET_PLAYER_BY_ID,
  GET_PLAYERS,
  UPDATE_PLAYER,
} from "@/features/player/player.query";
import { Player } from "@workspace/api/qgl-types";

export const usePlayers = () => useQuery<{ players: Player[] }>(GET_PLAYERS);

export const useGetPlayers = () =>
  useSuspenseQuery<{ players: Player[] }>(GET_PLAYERS);

export const useGetPlayerById = (id: string) =>
  useSuspenseQuery<{ player: Player }>(GET_PLAYER_BY_ID, { variables: { id } });

export const useUpdatePlayer = () => useMutation(UPDATE_PLAYER);
