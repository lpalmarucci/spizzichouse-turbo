"use client";

import { AnalyticCard } from "@/features/dashboard/components/analytic-card";
import { useGetMatches } from "@/features/match/match.hook";
import { useGetPlayers } from "@/features/player/player.hook";
import { PlayerStatus, Round } from "@workspace/api/qgl-types";
import { Layers, Trophy, Users } from "lucide-react";
import { useMemo } from "react";
import { MatchHistoryChart } from "@/features/dashboard/components/match-history-chart";

export function AnalyticsSection() {
  const {
    data: { matches },
    isFetching: isFetchingMatches,
  } = useGetMatches();

  const {
    data: { players },
    isFetching: isFetchingPlayers,
  } = useGetPlayers(PlayerStatus.Active);

  const rounds = useMemo<Round[]>(
    () => matches.map((m) => m.rounds).flat(),
    [matches],
  );

  return (
    <div className="w-full flex flex-col items-center justify-between px-2 gap-8">
      <div className="w-full flex flex-col ">
        <h1 className="font-semibold text-2xl md:text-3xl tracking-tighter">
          Analytics
        </h1>
        <p className="text-lg text-muted-foreground">
          Insights and statistics for your card game matches
        </p>
      </div>
      <div className="w-full flex items-center gap-2">
        <AnalyticCard
          title="Total Matches"
          icon={<Trophy className="h-4 w-4" />}
          value={matches.length}
          loading={isFetchingMatches}
        />
        <AnalyticCard
          title="Total Rounds"
          icon={<Layers className="h-4 w-4" />}
          value={rounds.length}
          loading={isFetchingMatches}
        />
        <AnalyticCard
          title="Active Players"
          icon={<Users className="h-4 w-4" />}
          value={players.length}
          loading={isFetchingPlayers}
        />
      </div>
      <div className="flex w-full gap-2 items-center">
        <MatchHistoryChart />
      </div>
    </div>
  );
}
