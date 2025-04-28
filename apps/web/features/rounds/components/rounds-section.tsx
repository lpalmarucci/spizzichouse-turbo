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
import { Plus, Save } from "lucide-react";
import {
  OfflineRound,
  RoundContext,
  RoundContextType,
} from "@/features/rounds/round.context";
import { use, useState } from "react";
import { RoundStatus } from "@workspace/api/qgl-types";

interface RoundsSectionProps {
  matchId: string;
}

function Section({ matchId }: RoundsSectionProps) {
  const { data, isFetching, error } = useGetRounds(matchId);
  const { data: matchData, isFetching: isFetchingMatch } = useGetMatch(matchId);
  const { setRounds } = use<RoundContextType>(RoundContext);

  if (isFetching || isFetchingMatch) {
    return <ScreenLoader />;
  }

  if (error) {
    toast.error(error.message);
    redirect(`/matches/${matchId}`);
    return;
  }

  function addRound() {
    setRounds((r) => [
      ...r,
      { number: 1, scores: [], status: RoundStatus.InProgress },
    ]);
  }

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
                {/*<CreateRoundDialog matchId={matchId} />*/}
                <Button onClick={addRound}>
                  <Plus />
                  Add Round
                </Button>
                <Button variant="outline">
                  <Save />
                  Save all
                </Button>
                {/*<Button*/}
                {/*  onClick={saveRounds}*/}
                {/*  size="sm"*/}
                {/*  variant="outline"*/}
                {/*  disabled={isLoading}*/}
                {/*>*/}
                {/*  <Save className="h-4 w-4 mr-1" />*/}
                {/*  Save All*/}
                {/*</Button>*/}
              </div>
            </div>

            <RoundsList matchId={matchId} />
          </TabsContent>
        </Tabs>
      </div>
    </Detail>
  );
}

export function RoundsSection(props: RoundsSectionProps) {
  const [rounds, setRounds] = useState<OfflineRound[]>([]);
  const { data, isFetching, error } = useGetRounds(props.matchId);
  if (isFetching) {
    return <ScreenLoader />;
  }

  if (error) {
    toast.error(error.message);
    redirect(`/matches/${props.matchId}`);
    return;
  }

  const offlineRounds = rounds.map((r) => ({
    number: r.number,
    scores: r.scores,
    status: r.status,
  }));

  console.log({ data });

  // const players = rounds[0]?.scores.reduce((acc, score) => {
  //   const player = score.playerId
  // }, [] as Player[])

  return (
    <RoundContext
      value={{
        rounds: offlineRounds,
        setRounds,
        matchId: props.matchId,
        players: [],
      }}
    >
      <Section {...props} />
    </RoundContext>
  );
}
