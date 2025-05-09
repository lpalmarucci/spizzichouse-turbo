import { Round } from "@workspace/api/qgl-types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cache } from "react";
import { orderRoundsByScore } from "@/utils/leaderboard";

interface MatchFinalStatsProps {
  rounds: Round[];
}

const calculateLeaderboardCache = cache(orderRoundsByScore);

export function MatchFinalStats({ rounds }: MatchFinalStatsProps) {
  const finalResults = calculateLeaderboardCache(rounds);
  const highestScore = Math.max(...finalResults.map((r) => r.score));
  const averageScore =
    finalResults.reduce((sum, res) => res.score + sum, 0) / rounds.length;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center gap-3">
          <StatCard title="Total Rounds" value={rounds.length} />
          <StatCard title="Highest Score" value={highestScore} />
          <StatCard title="Average Score" value={averageScore} />
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="w-full flex items-center p-4  bg-slate-50 dark:bg-slate-50/10 border rounded-md">
      <div className="flex flex-col justify-center">
        <span>{title}</span>
        <b className="text-3xl">{value}</b>
      </div>
    </div>
  );
}
