"use client";

import { Calendar, CalendarX2, Edit, Trophy, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Detail, DetailHeader } from "@/components/detail";
import { MatchStatus } from "@workspace/api/qgl-types";
import { useGetMatch } from "@/features/match/match.hook";
import { redirect, usePathname } from "next/navigation";
import { toast } from "sonner";
import { ScreenLoader } from "@/components/screen-loader";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useState, useTransition } from "react";
import { updateMatchAction } from "@/features/match/match.actions";
import { MatchDetailFinalResults } from "@/features/match/components/match-detail-final-results";

const getStatusColor = (status: string) => {
  switch (status) {
    case MatchStatus.Upcoming:
      return "bg-blue-500";
    case MatchStatus.InProgress:
      return "bg-green-500";
    case MatchStatus.Completed:
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-UK", { dateStyle: "short" });
};

interface MatchDetailProps {
  id: string;
}

export default function MatchDetail({ id }: MatchDetailProps) {
  const { data, isLoading, error } = useGetMatch(id);
  const [isEndMatchDialogOpen, setIsEndMatchDialogOpen] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function handleEndMatch() {
    startTransition(async () => {
      const { error } = await updateMatchAction(match.id, {
        status: MatchStatus.Completed,
      });
      if (error) {
        toast.error(error);
        return;
      }
      toast.info("Partita terminata correttamente");
      setIsEndMatchDialogOpen(false);
    });
  }

  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect("/matches");
    }, 500);
    return;
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!data) {
    toast.warning("No match found!");
    setTimeout(() => {
      redirect("/matches");
    }, 500);
    return;
  }

  const { match } = data;

  return (
    <>
      <Detail>
        <DetailHeader headingText={match.title} backLocationHref="/matches">
          <Button asChild>
            <Link href={`${pathname}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit match
            </Link>
          </Button>
        </DetailHeader>
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Match Details</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(match.status)}>
                    {match.status.charAt(0).toUpperCase() +
                      match.status.slice(1)}
                  </Badge>
                  {/*<CardDescription>Rule Set: {match.ruleSet}</CardDescription>*/}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                  <span>{formatDate(match.date)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 opacity-70" />
                  <span>{match.players!.length} players</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm">{match.description}</p>
                </div>
              </CardContent>
            </Card>

            {/*<Card className="flex-1">*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>Rules</CardTitle>*/}
            {/*    <CardDescription>Custom rules for this match</CardDescription>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <ul className="list-disc list-inside space-y-2">*/}
            {/*      {match.customRules.map((rule, index) => (*/}
            {/*        <li key={index}>{rule}</li>*/}
            {/*      ))}*/}
            {/*    </ul>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </div>

          <Tabs defaultValue="players">
            <div className="w-full flex items-center justify-between gap-2">
              <TabsList>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              <div className="flex gap-2 items-center">
                {[MatchStatus.Upcoming, MatchStatus.InProgress].includes(
                  match.status,
                ) && (
                  <>
                    <Button variant="outline" asChild>
                      <Link href={`/matches/${id}/rounds`}>
                        <Trophy />
                        Manage rounds
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-amber-500/10 border-amber-500 text-amber-500 hover:text-amber-400 hover:bg-amber-500/20"
                      onClick={() => setIsEndMatchDialogOpen(true)}
                    >
                      <CalendarX2 />
                      Termina partita
                    </Button>
                  </>
                )}
              </div>
            </div>
            <TabsContent value="players">
              <Card>
                <CardHeader>
                  <CardTitle>Participating Players</CardTitle>
                  <CardDescription>Players in this match</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {match.players!.map((player) => (
                      <Card key={player.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                              {player.full_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{player.full_name}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="results">
              {match.status === MatchStatus.Completed ? (
                <div className="space-y-6">
                  {/* Podio dei vincitori */}
                  <MatchDetailFinalResults match={match} />

                  {/*/!* Dettaglio punteggi per round *!/*/}
                  {/*<Card>*/}
                  {/*  <CardHeader className="pb-2">*/}
                  {/*    <CardTitle className="flex items-center gap-2">*/}
                  {/*      <BarChart3 className="h-5 w-5 text-blue-500" />*/}
                  {/*      Round-by-Round Scores*/}
                  {/*    </CardTitle>*/}
                  {/*    <CardDescription>*/}
                  {/*      Detailed scores for each round*/}
                  {/*    </CardDescription>*/}
                  {/*  </CardHeader>*/}
                  {/*  <CardContent>*/}
                  {/*    <div className="overflow-x-auto">*/}
                  {/*      <table className="w-full border-collapse">*/}
                  {/*        <thead>*/}
                  {/*          <tr className="bg-slate-50">*/}
                  {/*            <th className="text-left p-3 border-b">Player</th>*/}
                  {/*            {match.rounds.map((round) => (*/}
                  {/*              <th*/}
                  {/*                key={round.id}*/}
                  {/*                className="text-center p-3 border-b"*/}
                  {/*              >*/}
                  {/*                Round {round.number}*/}
                  {/*              </th>*/}
                  {/*            ))}*/}
                  {/*            <th className="text-center p-3 border-b font-bold">*/}
                  {/*              Total*/}
                  {/*            </th>*/}
                  {/*          </tr>*/}
                  {/*        </thead>*/}
                  {/*        <tbody>*/}
                  {/*          {rankedPlayers.map((player, index) => {*/}
                  {/*            const position = index + 1;*/}
                  {/*            const { color, textColor } =*/}
                  {/*              getRankingInfo(position);*/}

                  {/*            return (*/}
                  {/*              <tr*/}
                  {/*                key={player.id}*/}
                  {/*                className="hover:bg-slate-50"*/}
                  {/*              >*/}
                  {/*                <td className="p-3 border-b">*/}
                  {/*                  <div className="flex items-center gap-2">*/}
                  {/*                    <div*/}
                  {/*                      className={`w-2 h-2 rounded-full ${color}`}*/}
                  {/*                    ></div>*/}
                  {/*                    <span*/}
                  {/*                      className={`font-medium ${position <= 3 ? textColor : ""}`}*/}
                  {/*                    >*/}
                  {/*                      {player.name}*/}
                  {/*                    </span>*/}
                  {/*                  </div>*/}
                  {/*                </td>*/}
                  {/*                {match.rounds.map((round) => {*/}
                  {/*                  const scoreEntry = round.scores.find(*/}
                  {/*                    (s) => s.playerId === player.id,*/}
                  {/*                  );*/}
                  {/*                  const score = scoreEntry*/}
                  {/*                    ? scoreEntry.score*/}
                  {/*                    : 0;*/}

                  {/*                  // Find highest score in this round*/}
                  {/*                  const highestInRound = Math.max(*/}
                  {/*                    ...round.scores.map((s) => s.score),*/}
                  {/*                  );*/}
                  {/*                  const isHighest = score === highestInRound;*/}

                  {/*                  return (*/}
                  {/*                    <td*/}
                  {/*                      key={`${player.id}-${round.id}`}*/}
                  {/*                      className="text-center p-3 border-b"*/}
                  {/*                    >*/}
                  {/*                      <span*/}
                  {/*                        className={*/}
                  {/*                          isHighest*/}
                  {/*                            ? "font-bold text-green-600"*/}
                  {/*                            : ""*/}
                  {/*                        }*/}
                  {/*                      >*/}
                  {/*                        {score}*/}
                  {/*                      </span>*/}
                  {/*                    </td>*/}
                  {/*                  );*/}
                  {/*                })}*/}
                  {/*                <td className="text-center p-3 border-b font-bold">*/}
                  {/*                  {totalScores[player.id] || 0}*/}
                  {/*                </td>*/}
                  {/*              </tr>*/}
                  {/*            );*/}
                  {/*          })}*/}
                  {/*        </tbody>*/}
                  {/*      </table>*/}
                  {/*    </div>*/}
                  {/*  </CardContent>*/}
                  {/*</Card>*/}

                  {/*/!* Statistiche del match *!/*/}
                  {/*<Card>*/}
                  {/*  <CardHeader className="pb-2">*/}
                  {/*    <CardTitle>Match Statistics</CardTitle>*/}
                  {/*  </CardHeader>*/}
                  {/*  <CardContent>*/}
                  {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">*/}
                  {/*      <div className="bg-slate-50 p-4 rounded-lg">*/}
                  {/*        <div className="text-sm text-muted-foreground">*/}
                  {/*          Total Rounds*/}
                  {/*        </div>*/}
                  {/*        <div className="text-2xl font-bold">*/}
                  {/*          {match.rounds.length}*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*      <div className="bg-slate-50 p-4 rounded-lg">*/}
                  {/*        <div className="text-sm text-muted-foreground">*/}
                  {/*          Highest Score*/}
                  {/*        </div>*/}
                  {/*        <div className="text-2xl font-bold">*/}
                  {/*          {highestScore} pts*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*      <div className="bg-slate-50 p-4 rounded-lg">*/}
                  {/*        <div className="text-sm text-muted-foreground">*/}
                  {/*          Average Score*/}
                  {/*        </div>*/}
                  {/*        <div className="text-2xl font-bold">*/}
                  {/*          {Math.round(*/}
                  {/*            Object.values(totalScores).reduce(*/}
                  {/*              (a, b) => a + b,*/}
                  {/*              0,*/}
                  {/*            ) / match.players.length,*/}
                  {/*          )}{" "}*/}
                  {/*          pts*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </CardContent>*/}
                  {/*  <CardFooter className="text-sm text-muted-foreground">*/}
                  {/*    <div className="flex items-center gap-2">*/}
                  {/*      <Clock className="h-4 w-4" />*/}
                  {/*      <span>*/}
                  {/*        Match duration:{" "}*/}
                  {/*        {new Date(*/}
                  {/*          new Date(match.endDate).getTime() -*/}
                  {/*            new Date(match.date).getTime(),*/}
                  {/*        )*/}
                  {/*          .toISOString()*/}
                  {/*          .substr(11, 5)}*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  </CardFooter>*/}
                  {/*</Card>*/}
                </div>
              ) : (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Match Results</CardTitle>
                      <CardDescription>
                        "Results will be available once the match is completed
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 text-center border rounded-lg">
                      <div className="flex flex-col items-center gap-3">
                        <Trophy className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No Results Yet</h3>
                        <p className="text-muted-foreground max-w-md">
                          This match has not been completed yet. Use the Manage
                          Rounds feature to track scores and complete rounds.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Detail>

      <ConfirmationDialog
        open={isEndMatchDialogOpen}
        onOpenChange={setIsEndMatchDialogOpen}
        onConfirm={handleEndMatch}
        title="Sei sicuro di voler terminare la partita?"
        subtitle="Non potrai più modificare i vari punteggi"
        isPending={isPending}
      />
    </>
  );
}
