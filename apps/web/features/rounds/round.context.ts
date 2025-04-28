import { createContext, Dispatch, SetStateAction } from "react";
import { Player, RoundStatus } from "@workspace/api/qgl-types";

export type OfflineScore = {
  playerId: string;
  points: number;
  prevPoints: number;
};

export type OfflineRound = {
  id?: string;
  number: number;
  scores: OfflineScore[];
  status: RoundStatus;
};

export type RoundContextType = {
  rounds: OfflineRound[];
  setRounds: Dispatch<SetStateAction<OfflineRound[]>>;
  matchId: string;
  players: Player[];
};

export const RoundContext = createContext<RoundContextType>({
  matchId: "",
  rounds: [],
  setRounds: () => {},
  players: [],
});
