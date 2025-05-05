import { Player, Round } from "@workspace/api/qgl-types";
import { OfflineRound } from "@/features/rounds/round.context";

type ScoreResult = {
  score: number;
  player: Player;
};

export function orderRoundsByScore(rounds: Round[]): ScoreResult[] {
  const leaderboardMap = new Map<string, ScoreResult>();

  for (let round of rounds) {
    for (let score of round.scores) {
      const prevScore = leaderboardMap.get(score.player.id);
      if (!prevScore)
        leaderboardMap.set(score.player.id, {
          score: score.points,
          player: score.player,
        });
      else
        leaderboardMap.set(score.player.id, {
          score: prevScore.score + score.points,
          player: score.player,
        });
    }
  }

  return Array.from(leaderboardMap)
    .map(([_, obj]) => obj)
    .sort((a, b) => (a.score > b.score ? -1 : 1));
}

export function calculateLeaderboard(rounds: OfflineRound[]) {
  const leaderboardMap = new Map<string, number>();

  for (let round of rounds) {
    for (let score of round.scores) {
      const prevScore = leaderboardMap.get(score.playerId);
      if (!prevScore) leaderboardMap.set(score.playerId, score.points);
      else leaderboardMap.set(score.playerId, prevScore + score.points);
    }
  }

  return Array.from(leaderboardMap)
    .map(([playerId, score]) => ({
      playerId,
      score,
    }))
    .sort((a, b) => (a.score > b.score ? -1 : 1));
}
