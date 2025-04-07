import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createMatch,
  deleteMatch,
  getMatches,
} from "@/features/match/match.actions";
import { MatchWithPlayers } from "@workspace/db";
import { toast } from "sonner";

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
    onError: (error) => {
      toast(error.message);
    },
    retry: false,
    retryDelay: 0,
  });
}

export function useDeleteMatch(onSuccess?: () => void) {
  return useMutation({
    mutationFn: deleteMatch,
    retry: false,
    retryDelay: 0,
    onSuccess,
  });
}
