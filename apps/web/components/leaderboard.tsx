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
import React, { use, useMemo, useState } from "react";
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
import { LeaderboardMode, orderRoundsByScore } from "@/utils/leaderboard";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";

type LeaderboardScore = {
  playerId: string;
  score: number;
};

export function Leaderboard() {
  const { rounds, players } = use<RoundContextType>(RoundContext);
  const [leaderboardMode, setLeaderboardMode] =
    useState<LeaderboardMode>("points");
  const leaderboardScores = useMemo(
    () => orderRoundsByScore(rounds, leaderboardMode),
    [rounds, leaderboardMode],
  );

  return (
    <Card className="overflow-hidden relative bg-gradient-to-r-b from-">
      <div className="h-1 w-full absolute top-0 bg-gradient-to-r from-orange-500 to-orange-700" />
      <CardHeader>
        <CardTitle>
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Trophy className="text-orange-600" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Leaderboard
              </h1>
            </div>
            <ToggleGroup
              type="single"
              value={leaderboardMode}
              onValueChange={(value) =>
                value && setLeaderboardMode(value as LeaderboardMode)
              }
              className="bg-background border"
            >
              <ToggleGroupItem
                value="points"
                aria-label="Sort by total points"
                className="px-3 data-[state=on]:bg-gray-200/20 rounded-l-md"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Total Points
              </ToggleGroupItem>
              <ToggleGroupItem
                value="rounds"
                aria-label="Sort by rounds won"
                className="px-3 data-[state=on]:bg-gray-200/20 rounded-r-md"
              >
                <Medal className="h-4 w-4 mr-2" />
                Rounds Won
              </ToggleGroupItem>
            </ToggleGroup>
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
            {leaderboardScores.map(({ player, score }, index) => {
              return (
                <TableRow key={player.id}>
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
