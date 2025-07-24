'use client';

import { Detail } from '@/components/detail';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { MatchDetailHeader } from './match-detail-header';
import { MatchDetailTabs } from './match-detail-tabs';
import { MatchInfoCard } from './match-info-card';
import { ScreenLoader } from '@/components/screen-loader';
import { useMatch } from '../hooks/useMatch';

interface MatchDetailProps {
  id: string;
}

export default function MatchDetail({ id }: MatchDetailProps) {
  const { match, isEndMatchDialogOpen, setIsEndMatchDialogOpen, isUpdatingMatchPending, pathname, handleEndMatch } =
    useMatch(id);

  console.log({ match });

  return (
    <>
      <Detail>
        <MatchDetailHeader
          match={match}
          pathname={pathname}
          setIsEndMatchDialogOpen={setIsEndMatchDialogOpen}
          id={id}
        />
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <MatchInfoCard match={match} />
          </div>
          <MatchDetailTabs match={match} onTerminateMatch={() => setIsEndMatchDialogOpen(true)} id={id} />
        </div>
      </Detail>
      <ConfirmationDialog
        open={isEndMatchDialogOpen}
        onOpenChange={setIsEndMatchDialogOpen}
        onConfirm={handleEndMatch}
        title="Sei sicuro di voler terminare la partita?"
        subtitle="Non potrai più modificare i vari punteggi"
        isPending={isUpdatingMatchPending}
      />
    </>
  );
}
