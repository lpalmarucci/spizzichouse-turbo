'use client';

import { PlayersNotFound } from '@/features/player/components/players-not-found';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { ScreenLoader } from '@/components/screen-loader';
import { usePlayerFilters } from '@/features/player/hooks/usePlayerFilters';
import { PlayerFilters } from '@/features/player/components/player-filters';
import { PlayerList } from '@/features/player/components/player-list';

export function PlayerSection() {
  const {
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
  } = usePlayerFilters();

  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect('/');
    }, 500);
    return;
  }

  if (isFetching) {
    return <ScreenLoader />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Giocatori</h1>
          <p className="text-muted-foreground">Gestisci e monitora i giocatori delle tue partite di carte</p>
        </div>
      </div>
      <PlayerFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        levelFilter={levelFilter}
        setLevelFilter={setLevelFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      {sortedPlayers.length > 0 ? (
        <PlayerList players={sortedPlayers} />
      ) : (
        <PlayersNotFound
          searchQuery={searchQuery}
          levelFilter={levelFilter}
          statusFilter={statusFilter}
          onClearSearch={handleClearSearch}
          onClearFilters={handleClearFilters}
          onResetAll={handleResetAll}
        />
      )}
    </div>
  );
}
