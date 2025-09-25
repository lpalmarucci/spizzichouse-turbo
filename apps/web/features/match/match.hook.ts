import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  CreateMatch,
  Match,
  MatchHistory,
  MatchOrderBy,
  MatchPlayerStanding,
  UpdateMatch,
} from '@workspace/api/qgl-types';
import {
  CREATE_MATCH,
  DELETE_MATCH,
  GET_MATCH_BY_ID,
  GET_MATCHES,
  GET_MATCHES_HISTORY,
  GET_RECENT_MATCHES_BY_PLAYER,
  MATCH_HISTORY_QUERY_KEY,
  MATCH_QUERY_KEY,
  RECENT_MATCH_BY_PLAYER,
  UPDATE_MATCH,
} from '@/features/match/match.query';
import { gqlRequest } from '@/utils/query';

export const useGetMatches = (
  params: {
    take?: number;
    matchOrderBy?: MatchOrderBy;
  } = {},
) =>
  useSuspenseQuery<{ matches: Match[] }>({
    queryKey: [MATCH_QUERY_KEY, params.take, params.matchOrderBy],
    queryFn: () => gqlRequest(GET_MATCHES, params),
  });

export const useGetMatch = (id: string) =>
  useSuspenseQuery<{ match: Match }>({
    queryKey: [MATCH_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_MATCH_BY_ID, { id }),
  });

export const useGetMatchesHistory = () =>
  useQuery<{ recentMatchesHistory: MatchHistory[] }>({
    queryKey: [MATCH_HISTORY_QUERY_KEY],
    queryFn: () => gqlRequest(GET_MATCHES_HISTORY),
  });

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MATCH_QUERY_KEY],
    mutationFn: (match: CreateMatch) => gqlRequest<{ createMatch: Match }>(CREATE_MATCH, { match }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [MATCH_QUERY_KEY] });
      return data;
    },
  });
};
export const useUpdateMatch = () =>
  useMutation({
    mutationKey: [MATCH_QUERY_KEY],
    mutationFn: ({ id, match }: { id: string; match: UpdateMatch }) => gqlRequest(UPDATE_MATCH, { match, id }),
  });

export function useDeleteMatch() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MATCH_QUERY_KEY],
    mutationFn: (id: string) => gqlRequest(DELETE_MATCH, { id }),
    // Optimistic update
    // onMutate: async (id) => {
    //   debugger;
    //   await queryClient.cancelQueries({ queryKey: [MATCH_QUERY_KEY] });
    //   const previousMatches = queryClient.getQueryData([MATCH_QUERY_KEY]);
    //   queryClient.setQueryData([MATCH_QUERY_KEY], (old: any[]) => old.filter((m) => m.id !== id));
    //   return { previousMatches };
    // },
    // // Rollback if error
    // onError: (err, id, context) => {
    //   queryClient.setQueryData([MATCH_QUERY_KEY], context?.previousMatches);
    // },
    // // Refetch finale
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: [MATCH_QUERY_KEY] });
    // },
  });
}
export const useGetRecentMatchesByPlayer = (playerId: string) =>
  useSuspenseQuery<{ recentMatches: MatchPlayerStanding[] }>({
    queryKey: [MATCH_QUERY_KEY, RECENT_MATCH_BY_PLAYER, playerId],
    queryFn: () => gqlRequest(GET_RECENT_MATCHES_BY_PLAYER, { playerId }),
  });
