import { Player, Round } from "@workspace/api/qgl-types";

type ScoreResult = {
  score: number;
  player: Player;
};

export type LeaderboardMode = "points" | "rounds";

export function orderRoundsByScore(
  rounds: Round[],
  mode: LeaderboardMode = "points",
): ScoreResult[] {
  const leaderboardMap = new Map<string, ScoreResult>();

  for (let round of rounds) {
    for (let score of round.scores) {
      if (mode === "rounds") {
        const highestInRound = Math.max(...round.scores.map((s) => s.points));
        const isHighest = score.points === highestInRound;
        if (isHighest) {
          const prevRoundCount = leaderboardMap.get(score.player.id);
          if (!prevRoundCount)
            leaderboardMap.set(score.player.id, {
              score: 1,
              player: score.player,
            });
          else
            leaderboardMap.set(score.player.id, {
              score: prevRoundCount.score + 1,
              player: score.player,
            });
        } else if (!leaderboardMap.has(score.player.id)) {
          leaderboardMap.set(score.player.id, {
            score: 0,
            player: score.player,
          });
        }
      } else {
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
  }

  return Array.from(leaderboardMap)
    .map(([_, obj]) => obj)
    .sort((a, b) => (a.score > b.score ? -1 : 1));
}
