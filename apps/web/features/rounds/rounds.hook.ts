import { GET_PLAYER_BY_ID } from "@/features/player/player.query";
import { gqlRequest } from "@/utils/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Round } from "@workspace/api/qgl-types";
import {
  DELETE_ROUND,
  GET_ROUNDS,
  ROUNDS_QUERY_KEY,
} from "@/features/rounds/rounds.query";

export const useGetRounds = (matchId: string) =>
  useQuery<{ rounds: Round[] }>({
    queryKey: [ROUNDS_QUERY_KEY],
    queryFn: () => gqlRequest(GET_ROUNDS, { matchId }),
    initialData: () => ({ rounds: [] }),
  });

export const useGetRoundById = (id: string) =>
  useQuery<{ round: Round }>({
    queryKey: [ROUNDS_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_BY_ID, { id }),
  });

export const useDeleteRound = (id: string) =>
  useMutation({
    mutationKey: [DELETE_ROUND, id],
    mutationFn: () => gqlRequest(DELETE_ROUND, { id }),
  });
