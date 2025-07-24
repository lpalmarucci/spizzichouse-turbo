'use client';

import React from 'react';
import { useRoundsSection } from '@/features/rounds/hooks/useRoundsSection';
import { RoundContext } from '@/features/rounds/round.context';
import { Detail, DetailHeader } from '@/components/detail';
import RoundsTabs from './rounds-tabs';

interface RoundsSectionProps {
  matchId: string;
}

export function RoundsSection({ matchId }: RoundsSectionProps) {
  const { rounds, setRounds, match, players, refetchRounds } = useRoundsSection(matchId);

  return (
    <RoundContext value={{ rounds, setRounds, match, players, refetchRounds }}>
      <Detail>
        <DetailHeader
          headingText={`${match.title} - Rounds`}
          subHeadingText="Manage rounds and track player scores for this match."
        />
        <div className="w-full flex grow">
          <RoundsTabs />
        </div>
      </Detail>
    </RoundContext>
  );
}
