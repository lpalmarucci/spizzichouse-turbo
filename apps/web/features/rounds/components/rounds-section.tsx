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

interface RoundsSectionProps {
  matchId: string;
}

export function RoundsSection({ matchId }: RoundsSectionProps) {
  const { data, isFetching, error } = useGetRounds(matchId);
  const { data: matchData, isFetching: isFetchingMatch } = useGetMatch(matchId);

  if (isFetching || isFetchingMatch) {
    return <ScreenLoader />;
  }

  if (error) {
    toast.error(error.message);
    redirect(`/matches/${matchId}`);
    return;
  }

  console.log({ data });

  function addRound() {}

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
                <CreateRoundDialog />
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
