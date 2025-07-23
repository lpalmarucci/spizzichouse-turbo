'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { ScreenLoader } from '@/components/screen-loader';
import { MatchesFilters } from './matches-filters';
import MatchesList from './matches-list';
import MatchesEmptyState from './matches-empty-state';
import ConfirmationDialog from '@/components/confirmation-dialog';
import CreateMatchDialog from './create-match-dialog';
import { useMatches } from '../hooks/useMatches';
import ErrorState from '@/components/error-state';

export function MatchesSection() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [matchIdToDelete, setMatchIdToDelete] = useState<string | null>(null);

  const {
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
  } = useMatches();

  if (isLoading) return <ScreenLoader />;
  if (error) return <ErrorState message="Errore nel caricamento delle partite" />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">View and manage all your card game matches</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-1" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            New Match
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <MatchesFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          date={date}
          setDate={setDate}
        />

        <div>
          <MatchesList
            matches={filteredMatches}
            onDelete={(id) => {
              setMatchIdToDelete(id);
              setShowDeleteDialog(true);
            }}
          />

          {filteredMatches.length === 0 && (
            <MatchesEmptyState
              selectedDate={date}
              setSearchQuery={setSearchQuery}
              setStatusFilter={setStatusFilter}
              setDate={setDate}
            />
          )}
        </div>
      </div>

      {showCreateDialog && <CreateMatchDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />}

      {showDeleteDialog && (
        <ConfirmationDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={() => {
            if (matchIdToDelete) handleDeleteMatch(matchIdToDelete);
            setShowDeleteDialog(false);
          }}
        />
      )}
    </div>
  );
}
