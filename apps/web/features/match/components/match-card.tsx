'use client';

import { Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import UserAvatar from '@/components/user-avatar';
import { Match, MatchStatus, Player } from '@workspace/api/qgl-types';
import { getStatusColor, getStatusText } from '@/features/match/match.utils';
import { useState, useTransition, useCallback } from 'react';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { updateMatchAction } from '@/features/match/match.actions';
import { toast } from 'sonner';
import MatchCardActions from './match-card-actions';
import PlayersAvatars from '@/components/players-avatar';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-UK');
}

export function MatchCard({ match, onDelete }: { match: Match; onDelete: (id: string) => void }) {
  const [isEndMatchDialogOpen, setIsEndMatchDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Callback per terminare la partita
  const handleEndMatch = useCallback(() => {
    startTransition(async () => {
      const { error } = await updateMatchAction(match.id, {
        status: MatchStatus.Completed,
      });
      if (error) {
        toast.error(error);
        return;
      }
      toast.info('Partita terminata correttamente');
      setIsEndMatchDialogOpen(false);
    });
  }, [match.id]);

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{match.title}</CardTitle>
            <MatchCardActions
              match={match}
              onEdit={() => {}}
              onEnd={() => setIsEndMatchDialogOpen(true)}
              onDelete={() => onDelete(match.id)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(match.status)}>{getStatusText(match.status)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span>{match.duration ? `${match.duration}m` : 'Durata non disponibile'}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="mr-2 h-4 w-4 opacity-70" />
              <span>{match.players.length} players</span>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Players:</p>
              <PlayersAvatars players={match.players} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/matches/${match.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        open={isEndMatchDialogOpen}
        onOpenChange={setIsEndMatchDialogOpen}
        onConfirm={handleEndMatch}
        title="Sei sicuro di voler terminare la partita?"
        subtitle="Non potrai più modificare i vari punteggi"
        isPending={isPending}
      />
    </>
  );
}
