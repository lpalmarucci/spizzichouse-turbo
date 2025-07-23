'use client';

import { AnalyticCard } from '@/features/dashboard/components/analytic-card';
import { useGetMatches } from '@/features/match/match.hook';
import { useGetPlayers } from '@/features/player/player.hook';
import { PlayerStatus, Round } from '@workspace/api/qgl-types';
import { Layers, Trophy, Users } from 'lucide-react';
import { useMemo } from 'react';

export function AnalyticsSection() {
  const {
    data: { matches },
    isFetching: isFetchingMatches,
  } = useGetMatches();

  const {
    data: { players },
    isFetching: isFetchingPlayers,
  } = useGetPlayers(PlayerStatus.Active);

  const rounds = useMemo<Round[]>(() => matches.map((m) => m.rounds).flat(), [matches]);

  return (
    <div className="w-full flex items-center gap-2">
      <AnalyticCard
        title="Total Matches"
        icon={<Trophy className="h-4 w-4" />}
        value={matches.length}
        loading={isFetchingMatches}
      />
      <AnalyticCard
        title="Total Rounds"
        icon={<Layers className="h-4 w-4" />}
        value={rounds.length}
        loading={isFetchingMatches}
      />
      <AnalyticCard
        title="Active Players"
        icon={<Users className="h-4 w-4" />}
        value={players.length}
        loading={isFetchingPlayers}
      />
    </div>
  );
}
