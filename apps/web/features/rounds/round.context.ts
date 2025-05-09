import { createContext, Dispatch, SetStateAction } from "react";
import { Player, Round } from "@workspace/api/qgl-types";

export type OfflineScore = {
  playerId: string;
  points: number;
};

export type RoundContextType = {
  rounds: Round[];
  setRounds: Dispatch<SetStateAction<Round[]>>;
  matchId: string;
  players: Player[];
};

export const RoundContext = createContext<RoundContextType>({
  matchId: "",
  rounds: [],
  setRounds: () => {},
  players: [],
});
