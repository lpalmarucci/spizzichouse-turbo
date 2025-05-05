"use client";

import { useGetRounds } from "@/features/rounds/rounds.hook";
import { Detail, DetailHeader } from "@/components/detail";
import { ScreenLoader } from "@/components/screen-loader";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useGetMatch } from "@/features/match/match.hook";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { RoundsList } from "@/features/rounds/components/rounds-list";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import {
  OfflineRound,
  OfflineScore,
  RoundContext,
  RoundContextType,
} from "@/features/rounds/round.context";
import { use, useEffect, useMemo, useState } from "react";
import { RoundStatus } from "@workspace/api/qgl-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Leaderboard } from "@/components/leaderboard";

interface RoundsSectionProps {
  matchId: string;
}

function Section({ matchId }: RoundsSectionProps) {
  const { isFetching, error } = useGetRounds(matchId);
  const { data: matchData, isFetching: isFetchingMatch } = useGetMatch(matchId);
  const { rounds, setRounds, players } = use<RoundContextType>(RoundContext);

  if (isFetching || isFetchingMatch) {
    return <ScreenLoader />;
  }

  if (error) {
    toast.error(error.message);
    redirect(`/matches/${matchId}`);
    return;
  }

  function addRound() {
    const newScores: OfflineScore[] = players.map((p) => ({
      playerId: p.id,
      points: 0,
      prevPoints: 0,
    }));
    setRounds((r) => {
      const newRoundNumber = (r.slice().pop()?.number ?? 0) + 1;
      return [
        ...r,
        {
          number: newRoundNumber,
          scores: newScores,
          status: RoundStatus.InProgress,
        },
      ];
    });
  }

  const inProgressRound = useMemo<boolean>(() => {
    return rounds.some((r) => r.status === RoundStatus.InProgress);
  }, [rounds]);

  return (
    <Detail>
      <DetailHeader
        headingText={`${matchData?.match.title} - Rounds`}
        subHeadingText="Manage rounds and track player scores for this match."
      />
      <div className="w-full flex grow">
        <Tabs defaultValue="rounds" className="w-full">
          <TabsList>
            <TabsTrigger value="rounds">Rounds</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          <TabsContent value="rounds" className="py-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Match Rounds</h3>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip delayDuration={600}>
                    <TooltipTrigger asChild>
                      <Button onClick={addRound} disabled={inProgressRound}>
                        <Plus />
                        Add Round
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {inProgressRound
                        ? "There's already a round in progress"
                        : "Add new round e save scores"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <RoundsList />
          </TabsContent>
          <TabsContent value="leaderboard" className="pt-4">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </Detail>
  );
}

export function RoundsSection(props: RoundsSectionProps) {
  const [rounds, setRounds] = useState<OfflineRound[]>([]);
  const { data: roundData, isFetching, error } = useGetRounds(props.matchId);
  const {
    data: matchData,
    isFetching: isFetchingMatch,
    error: errorMatch,
  } = useGetMatch(props.matchId);

  useEffect(() => {
    if (!roundData) return;
    const newRounds = roundData?.rounds.map((r) => ({
      id: r.id,
      number: r.number,
      scores: r.scores.map((s) => ({
        playerId: s.player.id,
        points: s.points,
        prevPoints: s.points,
      })),
      status: r.status,
    }));
    setRounds(newRounds);
  }, [roundData]);

  if (isFetching || isFetchingMatch) {
    return <ScreenLoader />;
  }

  if (error || errorMatch) {
    toast.error(error?.message ?? errorMatch?.message);
    redirect(`/matches/${props.matchId}`);
    return;
  }

  return (
    <RoundContext
      value={{
        rounds,
        setRounds,
        matchId: props.matchId,
        players: matchData?.match.players ?? [],
      }}
    >
      <Section {...props} />
    </RoundContext>
  );
}
