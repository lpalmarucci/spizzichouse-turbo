import { useMemo, useState } from 'react';
import { useGetPlayersStats } from '@/features/player/player.hook';
import { PlayerLevel, PlayerStats, PlayerStatus } from '@workspace/api/qgl-types';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type SortDirection = 'asc' | 'desc';

export function usePlayerFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<PlayerLevel | undefined>();
  const [statusFilter, setStatusFilter] = useState<PlayerStatus | undefined>();
  const [sortField, setSortField] = useState<keyof PlayerStats>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { data, isFetching, error } = useGetPlayersStats();

  const filteredPlayers = useMemo(() => {
    if (!data || !data?.playersWithStats) return [];
    return data.playersWithStats.filter((player) => {
      if (searchQuery && !player.full_name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (levelFilter && player.level !== levelFilter) {
        return false;
      }
      return !(statusFilter && player.status !== statusFilter);
    });
  }, [data, searchQuery, statusFilter, levelFilter]);

  const sortedPlayers = useMemo<PlayerStats[]>(() => {
    if (!filteredPlayers) return [];
    return filteredPlayers.sort((a: PlayerStats, b: PlayerStats) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (!aValue || !bValue) return -1;
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortDirection === 'asc'
        ? (aValue as unknown as number) - (bValue as unknown as number)
        : (bValue as unknown as number) - (aValue as unknown as number);
    });
  }, [filteredPlayers, sortField, sortDirection]);

  function handleResetAll() {
    setSearchQuery('');
    setLevelFilter(undefined);
    setStatusFilter(undefined);
  }
  function handleClearSearch() {
    setSearchQuery('');
  }
  function handleClearFilters() {
    setLevelFilter(undefined);
    setStatusFilter(undefined);
  }

  return {
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    statusFilter,
    setStatusFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    sortedPlayers,
    isFetching,
    error,
    handleResetAll,
    handleClearSearch,
    handleClearFilters,
  };
}
