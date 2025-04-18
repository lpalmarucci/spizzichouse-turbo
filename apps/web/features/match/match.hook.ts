import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Match } from "@workspace/api/qgl-types";
import {
  CREATE_MATCH,
  DELETE_MATCH,
  GET_MATCH_BY_ID,
  GET_MATCHES,
  UPDATE_MATCH,
} from "@/features/match/match.query";

export type GetAllMatches = {
  matches: Match[];
};

export const useGetMatches = () => useSuspenseQuery<GetAllMatches>(GET_MATCHES);

export const useGetMatch = (id: string) =>
  useSuspenseQuery<{ match: Match }>(GET_MATCH_BY_ID, { variables: { id } });

export const useCreateMatch = () => useMutation(CREATE_MATCH);
export const useUpdateMatch = () => useMutation(UPDATE_MATCH);
export const useDeleteMatch = () => useMutation(DELETE_MATCH);
