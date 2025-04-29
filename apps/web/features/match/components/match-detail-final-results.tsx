"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Trophy } from "lucide-react";
import { Match } from "@workspace/api/qgl-types";
import { useMemo } from "react";
import { orderRoundsByScore } from "@/utils/leaderboard";
import { getRankingInfo } from "@/features/match/match.utils";
import { Progress } from "@workspace/ui/components/progress";

interface MatchDetailFinalResultsProps {
  match: Match;
}

type RankedPlayer = {
  id: string;
  full_name: string;
  score: number;
};

export function MatchDetailFinalResults({
  match,
}: MatchDetailFinalResultsProps) {
  const finalResults = useMemo(() => orderRoundsByScore(match.rounds), [match]);

  const highestScore = useMemo(() => {
    let max = -1;
    finalResults.forEach((res) => {
      max = Math.max(res.score, max);
    });
    return max;
  }, [finalResults]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Final Results
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-4">
          {finalResults.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-yellow-600 font-medium">
                      Winner
                    </div>
                    <div className="text-xl font-bold text-background">
                      {finalResults[0]?.player.full_name}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-700">
                  {finalResults[0]?.score} pts
                </div>
              </div>
            </div>
          )}

          <div className="border rounded-lg overflow-hidden">
            <div className=" p-3 border-b">
              <h3 className="font-medium">Final Standings</h3>
            </div>
            <div className="divide-y">
              {finalResults.map((result, index) => {
                const position = index + 1;
                const { icon, color } = getRankingInfo(position);
                const score = result.score || 0;
                const percentage = Math.round((score / highestScore) * 100);

                return (
                  <div key={result.player.id} className="p-3 flex items-center">
                    <div className="w-8 flex justify-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${color} text-white`}
                      >
                        {icon}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium">
                        {result.player.full_name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="h-2" />
                        <span className="text-sm font-medium">{score} pts</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
