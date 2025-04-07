import { useMutation, useQuery } from "@tanstack/react-query";
import { createMatch, getMatches } from "@/features/match/match.actions";
import { MatchWithPlayers } from "@workspace/db";

export const MATCH_QUERY_KEY = "match";

export function useGetMatches() {
  return useQuery<MatchWithPlayers[]>({
    queryKey: [MATCH_QUERY_KEY],
    queryFn: getMatches,
  });
}

export function useCreateMatch(onSuccess?: () => void) {
  return useMutation({
    mutationFn: createMatch,
    onSuccess,
    retry: false,
    retryDelay: 0,
  });
}
