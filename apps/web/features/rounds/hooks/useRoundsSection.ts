import { useEffect, useState } from 'react';
import { useGetRounds } from '@/features/rounds/rounds.hook';
import { useGetMatch } from '@/features/match/match.hook';
import { Round } from '@workspace/api/qgl-types';

export const useRoundsSection = (matchId: string) => {
  const {
    data: { rounds: roundsData },
    isFetching,
    refetch: refetchRounds,
  } = useGetRounds(matchId);
  const { data: matchData, isFetching: isFetchingMatch } = useGetMatch(matchId);

  const [rounds, setRounds] = useState<Round[]>(roundsData ?? []);

  const isLoading = isFetching || isFetchingMatch;
  const match = matchData?.match;
  const players = match?.players ?? [];

  return {
    rounds,
    setRounds,
    match,
    players,
    isLoading,
    refetchRounds,
  };
};
