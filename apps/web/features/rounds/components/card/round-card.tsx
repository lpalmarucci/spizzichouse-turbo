'use client';

import React from 'react';
import { Round } from '@workspace/api/qgl-types';
import { Card } from '@workspace/ui/components/card';
import { getStatusColor } from '@/features/rounds/rounds.utils';
import { RoundCardHeader } from './round-card-header';
import { RoundCardTable } from './round-card-table';
import { useRoundCard } from '@/features/rounds/hooks/useRoundCard';

interface RoundCardProps {
  round: Round;
}

const RoundCard: React.FC<RoundCardProps> = ({ round }) => {
  const { handleDeleteRound, handleUpdateRoundScore, handleCreateRound, isPending } = useRoundCard(round);

  return (
    <Card className="overflow-hidden relative m-0">
      <div className={`h-1 w-full absolute top-0 bg-gradient-to-r ${getStatusColor(round.status)}`} />
      <div className="pb-2 px-4">
        <RoundCardHeader
          round={round}
          status={round.status}
          onDelete={handleDeleteRound}
          onComplete={handleCreateRound}
          isLoading={isPending}
        />
      </div>
      <div className="pb-2 px-4">
        <RoundCardTable round={round} status={round.status} onUpdateScore={handleUpdateRoundScore} />
      </div>
    </Card>
  );
};

export default RoundCard;
