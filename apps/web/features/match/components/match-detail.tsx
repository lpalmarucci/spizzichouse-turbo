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
import { RoundsByRoundsScore } from "@/features/match/components/rounds-by-rounds-score";
import { MatchFinalStats } from "@/features/match/components/match-final-stats";

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
          {match.status == MatchStatus.Upcoming && (
            <Button asChild>
              <Link href={pathname + "/edit"}>
                <Edit className="mr-2 h-4 w-4" />
                Edit match
              </Link>
            </Button>
          )}
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
          </div>

          <Tabs defaultValue="players">
            <div className="w-full flex items-center justify-between gap-2">
              <TabsList>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              <div className="flex gap-2 items-center">
                {match.status === MatchStatus.InProgress && (
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
                  <MatchDetailFinalResults match={match} />
                  <RoundsByRoundsScore rounds={match.rounds} />
                  <MatchFinalStats rounds={match.rounds} />
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
