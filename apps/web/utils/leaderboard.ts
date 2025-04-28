import { Player, Round } from "@workspace/api/qgl-types";

type ScoreResult = {
  score: number;
  player: Player;
};

export function orderResultsByScore(rounds: Round[]): ScoreResult[] {
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
