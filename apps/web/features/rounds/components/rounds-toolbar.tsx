import { Button } from '@workspace/ui/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@workspace/ui/components/tooltip';

import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { Plus } from 'lucide-react';
import { Match, Player, Round, RoundStatus, Score } from '../../../../api/src/@graphql/types';
import { useMemo } from 'react';

// Presentational: Toolbar
const RoundsToolbar: React.FC<{
  rounds: Round[];
  setRounds: React.Dispatch<React.SetStateAction<Round[]>>;
  players: Player[];
  match: Match;
}> = ({ rounds, setRounds, players, match }) => {
  const inProgressRound = useMemo(() => rounds.some((r) => r.status === RoundStatus.InProgress), [rounds]);
  const handleAddRound = () => {
    const newScores: Score[] = players.map((p) => ({ player: p, match, points: 0 }) as Score);
    setRounds((r) => {
      const newRoundNumber = (r.slice().pop()?.number ?? 0) + 1;
      return [
        ...r,
        {
          id: '',
          number: newRoundNumber,
          status: RoundStatus.InProgress,
          match,
          score: 0,
          scores: newScores,
          createdAt: new Date(),
        } as Round,
      ];
    });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={600}>
        <TooltipTrigger asChild>
          <Button onClick={handleAddRound} disabled={inProgressRound}>
            <Plus />
            Add Round
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {inProgressRound ? "There's already a round in progress" : 'Add new round e save scores'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoundsToolbar;
