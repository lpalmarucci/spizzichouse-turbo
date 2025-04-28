"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Medal, Trophy } from "lucide-react";
import React, { use, useMemo } from "react";
import {
  RoundContext,
  RoundContextType,
} from "@/features/rounds/round.context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import UserAvatar from "@/components/user-avatar";
import { Separator } from "@workspace/ui/components/separator";

type LeaderboardScore = {
  playerId: string;
  score: number;
};

export function Leaderboard() {
  const { rounds, players } = use<RoundContextType>(RoundContext);
  const leaderboardScores = useMemo<LeaderboardScore[]>(() => {
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
  }, [rounds]);

  return (
    <Card className="overflow-hidden relative bg-gradient-to-r-b from-">
      <div className="h-1 w-full absolute top-0 bg-gradient-to-r from-orange-500 to-orange-700" />
      <CardHeader>
        <CardTitle>
          <div className="w-full flex items-center gap-2">
            <Trophy className="text-orange-600" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Leaderboard
            </h1>
          </div>
        </CardTitle>
        <CardDescription>
          Current standings based on total scores across all rounds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Total score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardScores.map(({ playerId, score }, index) => {
              const player = players.find((p) => p.id === playerId);
              if (!player) return;
              return (
                <TableRow key={`${score}`}>
                  <TableCell>
                    <div className="flex items-center">
                      {index === 0 ? (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center shadow-md border-2 border-yellow-200">
                          <Trophy className="h-5 w-5 text-yellow-800" />
                        </div>
                      ) : index === 1 ? (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-slate-200 to-slate-400 flex items-center justify-center shadow-md border-2 border-slate-200">
                          <Medal className="h-5 w-5 text-slate-700" />
                        </div>
                      ) : index === 2 ? (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center shadow-md border-2 border-amber-500">
                          <Medal className="h-5 w-5 text-amber-100" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center font-medium text-blue-700">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="h-16">
                    <div className="w-full flex items-center gap-4">
                      <UserAvatar name={player.full_name} />
                      {player.full_name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`text-xl font-bold 
                          ${
                            index === 0
                              ? "text-yellow-600"
                              : index === 1
                                ? "text-slate-600"
                                : index === 2
                                  ? "text-amber-700"
                                  : "text-blue-700"
                          }`}
                    >
                      {score}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col gap-6">
          <Separator />
          <div className="w-full flex items-center justify-between">
            <span>Total rounds: {rounds.length}</span>
            <span>Players: {players.length}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
