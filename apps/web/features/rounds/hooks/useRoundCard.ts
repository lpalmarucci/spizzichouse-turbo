import { Round, RoundStatus } from '@workspace/api/qgl-types';
import { useCreateRound, useDeleteRound } from '@/features/rounds/rounds.hook';
import { toast } from 'sonner';
import { use } from 'react';
import { RoundContext, RoundContextType } from '@/features/rounds/round.context';

export const useRoundCard = (round: Round) => {
  const { setRounds, match, refetchRounds } = use<RoundContextType>(RoundContext);
  const { mutateAsync: createRound, isPending } = useCreateRound();
  const { mutateAsync: deleteRound } = useDeleteRound();

  const handleDeleteRound = async () => {
    if (!round.id) {
      toast.error('Unable to delete a round that is currently in progress!');
      return;
    }

    try {
      await deleteRound(round.id);
      toast.info(`Round #${round.number} deleted successfully!`);

      const { data } = await refetchRounds();
      setRounds(data?.rounds ?? []);
    } catch (error) {
      toast.error(`Error while trying to delete round #${round.number}`);
      return Promise.reject(error);
    }
  };

  const handleUpdateRoundScore = (number: number, playerId: string, score: number) => {
    setRounds((prev) => {
      const newRounds = structuredClone(prev);
      const roundToUpdate = newRounds.find((r) => r.number === number);
      if (!roundToUpdate) return prev;
      const scoreIdx = roundToUpdate.scores.findIndex((s) => s.player.id === playerId);
      if (scoreIdx === -1) return prev;
      roundToUpdate.scores[scoreIdx]!.points = score;
      return newRounds;
    });
  };

  const handleCreateRound = async () => {
    try {
      await createRound({
        matchId: match.id,
        number: round.number,
        status: RoundStatus.Completed,
        scores: round.scores.map((r) => ({
          playerId: r.player.id,
          points: r.points,
        })),
      });
      toast.info(`Round #${round.number} created successfully!`);

      const { data } = await refetchRounds();
      setRounds(data?.rounds ?? []);
    } catch (error) {
      toast.error(`Error while trying to create round #${round.number}`);
    }
  };

  return {
    handleDeleteRound,
    handleUpdateRoundScore,
    handleCreateRound,
    isPending,
  };
};
