import React from 'react';
import { Round, RoundStatus } from '@workspace/api/qgl-types';
import { Badge } from '@workspace/ui/components/badge';
import { SubmitButton } from '@/components/submit-button';
import { RoundDeleteButton } from '@/features/rounds/components/round-delete-button';

interface RoundCardHeaderProps {
  round: Round;
  status: RoundStatus;
  onDelete: () => void;
  onComplete: () => void;
  isLoading: boolean;
}

export const RoundCardHeader: React.FC<RoundCardHeaderProps> = ({ round, status, onDelete, onComplete, isLoading }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <h4 className="text-base font-medium">Round {round.number}</h4>
      <Badge
        variant={status === RoundStatus.Completed ? 'outline' : 'default'}
        className={
          status === RoundStatus.Completed
            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
            : 'bg-green-100 text-green-800 hover:bg-green-100'
        }
      >
        {status === RoundStatus.Completed ? 'Completed' : 'In Progress'}
      </Badge>
    </div>
    <div className="flex gap-2 items-center">
      {status === RoundStatus.Completed ? (
        <RoundDeleteButton number={round.number} onConfirm={onDelete} />
      ) : (
        <SubmitButton
          className="bg-gradient-to-r from-green-500 to-green-600 transition-all hover:from-green-600 hover:to-green-700"
          onClick={onComplete}
          isLoading={isLoading}
        >
          Complete
        </SubmitButton>
      )}
    </div>
  </div>
);
