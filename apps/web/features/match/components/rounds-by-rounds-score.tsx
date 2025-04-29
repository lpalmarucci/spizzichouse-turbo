"use client";

import { Round } from "@workspace/api/qgl-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { BarChart3 } from "lucide-react";
import { useMemo } from "react";
import { orderResultsByScore } from "@/utils/leaderboard";
import { getRankingInfo } from "@/features/match/match.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

interface RoundsByRoundsScoreProps {
  rounds: Round[];
}

export function RoundsByRoundsScore({ rounds }: RoundsByRoundsScoreProps) {
  const finalResults = useMemo(() => orderResultsByScore(rounds), [rounds]);
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Round-by-Round Scores
        </CardTitle>
        <CardDescription>Detailed scores for each round</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableCell className="text-left p-3 border-b">Player</TableCell>
                {rounds.map((round) => (
                  <TableCell
                    key={round.id}
                    className="text-center p-3 border-b"
                  >
                    Round {round.number}
                  </TableCell>
                ))}
                <TableCell className="text-center p-3 border-b font-bold">
                  Total
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalResults.map((result, index) => {
                const position = index + 1;
                const { color, textColor } = getRankingInfo(position);

                return (
                  <TableRow key={result.player.id}>
                    <TableCell className="p-3 border-b">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${color}`}></div>
                        <span
                          className={`font-medium ${position <= 3 ? textColor : ""}`}
                        >
                          {result.player.full_name}
                        </span>
                      </div>
                    </TableCell>
                    {rounds.map((round) => {
                      const scoreEntry = round.scores.find(
                        (s) => s.player.id === result.player.id,
                      );
                      const score = scoreEntry ? scoreEntry.points : 0;

                      // Find highest score in this round
                      const highestInRound = Math.max(
                        ...round.scores.map((s) => s.points),
                      );
                      const isHighest = score === highestInRound;

                      return (
                        <TableCell
                          key={`${result.player.id}-${round.id}`}
                          className="text-center p-3 border-b"
                        >
                          <span
                            className={
                              isHighest ? "font-bold text-green-600" : ""
                            }
                          >
                            {score}
                          </span>
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center p-3 border-b font-bold">
                      {result.score || 0}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
