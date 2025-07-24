import { useGetMatch } from '@/features/match/match.hook';
import { useState, useTransition } from 'react';
import { updateMatchAction } from '@/features/match/match.actions';
import { MatchStatus } from '@workspace/api/qgl-types';
import { toast } from 'sonner';
import { redirect, usePathname } from 'next/navigation';
import { useUpdateMatch } from '@/features/match/match.hook';
import { MATCH_QUERY_KEY } from '../match.query';
import { useQueryClient } from '@tanstack/react-query';

export const useMatch = (id: string) => {
  const {
    data: { match },
    isLoading,
    error,
    refetch,
  } = useGetMatch(id);
  const [isEndMatchDialogOpen, setIsEndMatchDialogOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const { mutateAsync: updateMatch, isPending: isUpdatingMatchPending } = useUpdateMatch();
  const queryClient = useQueryClient();

  async function handleEndMatch() {
    try {
      await updateMatch({ id: match.id, match: { status: MatchStatus.Completed } });
      toast.info('Partita terminata correttamente');
      setIsEndMatchDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: [MATCH_QUERY_KEY] });
      refetch();
    } catch (error) {
      toast.error('An error occurred while updating the match');
    }
  }

  return {
    match,
    isLoading,
    error,
    isEndMatchDialogOpen,
    setIsEndMatchDialogOpen,
    isUpdatingMatchPending,
    pathname,
    handleEndMatch,
  };
};
