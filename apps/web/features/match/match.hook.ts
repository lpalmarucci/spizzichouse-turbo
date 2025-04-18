import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { CreateMatch, Match, UpdateMatch } from "@workspace/api/qgl-types";
import {
  CREATE_MATCH,
  DELETE_MATCH,
  GET_MATCH_BY_ID,
  GET_MATCHES,
  MATCH_QUERY_KEY,
  UPDATE_MATCH,
} from "@/features/match/match.query";
import { gqlRequest } from "@/utils/query";

export const useGetMatches = () =>
  useSuspenseQuery<{ matches: Match[] }>({
    queryKey: [MATCH_QUERY_KEY],
    queryFn: () => gqlRequest(GET_MATCHES),
  });

export const useGetMatch = (id: string) =>
  useSuspenseQuery<{ match: Match }>({
    queryKey: [MATCH_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_MATCH_BY_ID, { id }),
  });

export const useCreateMatch = (match: CreateMatch) =>
  useMutation({
    mutationKey: [MATCH_QUERY_KEY],
    mutationFn: () => gqlRequest(CREATE_MATCH, { match }),
  });
export const useUpdateMatch = (id: string, match: UpdateMatch) =>
  useMutation({
    mutationKey: [MATCH_QUERY_KEY],
    mutationFn: () => gqlRequest(UPDATE_MATCH, { match }),
  });
export const useDeleteMatch = (id: string) =>
  useMutation({
    mutationKey: [MATCH_QUERY_KEY],
    mutationFn: () => gqlRequest(DELETE_MATCH, { id }),
  });
