import { GET_PLAYER_BY_ID } from "@/features/player/player.query";
import { gqlRequest } from "@/utils/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateRoundInput, Round } from "@workspace/api/qgl-types";
import {
  CREATE_ROUND,
  DELETE_ROUND,
  GET_ROUNDS,
  ROUNDS_QUERY_KEY,
} from "@/features/rounds/rounds.query";

export const useGetRounds = (matchId: string) =>
  useQuery({
    queryKey: [ROUNDS_QUERY_KEY, matchId],
    queryFn: () => gqlRequest<{ rounds: Round[] }>(GET_ROUNDS, { matchId }),
  });

export const useGetRoundById = (id: string) =>
  useQuery<{ round: Round }>({
    queryKey: [ROUNDS_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_BY_ID, { id }),
  });

export const useCreateRound = () =>
  useMutation({
    mutationKey: [ROUNDS_QUERY_KEY],
    mutationFn: (createRoundInput: CreateRoundInput) =>
      gqlRequest<{ round: Round }>(CREATE_ROUND, { createRoundInput }),
  });

export const useDeleteRound = () =>
  useMutation({
    mutationKey: [DELETE_ROUND],
    mutationFn: (id: string) =>
      gqlRequest<{ round: Round }>(DELETE_ROUND, { id }),
  });
