import { createContext, Dispatch, SetStateAction } from 'react';
import { Match, Player, Round } from '@workspace/api/qgl-types';
import { useGetRounds } from './rounds.hook';
import { QueryObserverResult } from '@tanstack/react-query';

export type OfflineScore = {
  playerId: string;
  points: number;
};

export type RoundContextType = {
  rounds: Round[];
  setRounds: Dispatch<SetStateAction<Round[]>>;
  match: Match;
  players: Player[];
  refetchRounds: ReturnType<typeof useGetRounds>['refetch'];
};

export const RoundContext = createContext<RoundContextType>({
  match: {} as Match,
  rounds: [],
  setRounds: () => {},
  players: [],
  refetchRounds: () => ({}) as never,
});
