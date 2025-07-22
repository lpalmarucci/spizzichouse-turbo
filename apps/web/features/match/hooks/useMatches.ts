import { useState, useMemo } from 'react';
import { useGetMatches, useDeleteMatch } from '@/features/match/match.hook';
import { toast } from 'sonner';

export function useMatches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const {
    data: { matches = [] },
    isLoading,
    error,
  } = useGetMatches();
  const { mutateAsync: deleteMatch } = useDeleteMatch();

  // Filtering logic
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      if (searchQuery && !match.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (statusFilter !== 'all' && match.status !== statusFilter) return false;
      if (date) {
        const matchDate = new Date(match.date);
        return (
          matchDate.getDate() === date.getDate() &&
          matchDate.getMonth() === date.getMonth() &&
          matchDate.getFullYear() === date.getFullYear()
        );
      }
      return true;
    });
  }, [matches, searchQuery, statusFilter, date]);

  // Delete logic (optimistic update handled in the hook)
  async function handleDeleteMatch(id: string) {
    try {
      await deleteMatch(id);
      toast.info('Match deleted successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    date,
    setDate,
    filteredMatches,
    isLoading,
    error,
    handleDeleteMatch,
  };
}
