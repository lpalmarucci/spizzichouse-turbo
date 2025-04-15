import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createMatch,
  deleteMatch,
  editMatch,
  getMatchById,
  getMatches,
} from "@/features/match/match.actions";
import { Match } from "@workspace/api/qgl-types";
import { toast } from "sonner";

export const MATCH_QUERY_KEY = "match";

export function useGetMatches() {
  return useQuery<Match[]>({
    queryKey: [MATCH_QUERY_KEY],
    queryFn: getMatches,
  });
}

export function useGetMatchById(id: string) {
  return useQuery<Match>({
    queryKey: [MATCH_QUERY_KEY, id],
    queryFn: async ({ queryKey }) => {
      const [_, matchId] = queryKey;
      return getMatchById(matchId as string);
    },
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

export function useEditMatch(onSuccess?: () => void) {
  return useMutation({
    mutationFn: editMatch,
    onSuccess,
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
