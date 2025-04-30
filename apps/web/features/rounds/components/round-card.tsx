"use client";

import { RoundStatus } from "@workspace/api/qgl-types";
import { getStatusColor } from "@/features/rounds/rounds.utils";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  OfflineRound,
  RoundContext,
  RoundContextType,
} from "@/features/rounds/round.context";
import { use } from "react";
import { getInitials } from "@/features/player/utils";
import { Input } from "@workspace/ui/components/input";
import { RoundDeleteButton } from "@/features/rounds/components/round-delete-button";
import { SubmitButton } from "@/components/submit-button";
import { useCreateRound, useDeleteRound } from "@/features/rounds/rounds.hook";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ROUNDS_QUERY_KEY } from "@/features/rounds/rounds.query";

interface RoundCardProps {
  round: OfflineRound;
}

export default function RoundCard({ round }: RoundCardProps) {
  const { players, setRounds, matchId } = use<RoundContextType>(RoundContext);
  const { mutateAsync: createRound, isPending } = useCreateRound();
  const { mutateAsync: deleteRound } = useDeleteRound();
  const queryClient = useQueryClient();

  function handleDeleteRound() {
    if (!round.id) {
      toast.error("Unable to delete a round that is currently in progress!");
      return;
    }
    deleteRound(round.id)
      .then(() => {
        toast.info(`Round #${round.number} deleted successfully!`);
        queryClient.invalidateQueries({
          queryKey: [ROUNDS_QUERY_KEY],
        });
      })
      .catch(() => {
        toast.error(`Error while trying to delete round #${round.number}`);
      });
  }

  function updateRoundScore(number: number, playerId: string, score: number) {
    setRounds((prev) => {
      const newRounds = structuredClone(prev);
      const round = newRounds.find((r) => r.number === number);
      if (!round) return prev;

      const scoreIdx = round.scores.findIndex((s) => s.playerId === playerId);
      if (scoreIdx === -1) return prev;

      round.scores[scoreIdx]!.points = score;
      return newRounds;
    });
  }

  function handleCreateRound() {
    createRound({
      matchId,
      number: round.number,
      status: RoundStatus.Completed,
      scores: round.scores.map((r) => ({
        playerId: r.playerId,
        points: r.points,
      })),
    })
      .then(() => {
        toast.info(`Round #${round.number} created successfully!`);
        queryClient.invalidateQueries({
          queryKey: [ROUNDS_QUERY_KEY],
        });
      })
      .catch(() => {
        toast.error(`Error while trying to create round #${round.number}`);
      });
  }

  return (
    <Card className="overflow-hidden relative m-0">
      <div
        className={`h-1 w-full absolute top-0 bg-gradient-to-r ${getStatusColor(round.status)}`}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-medium">Round {round.number}</h4>
            <Badge
              variant={
                round.status === RoundStatus.Completed ? "outline" : "default"
              }
              className={
                round.status === RoundStatus.Completed
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : "bg-green-100 text-green-800 hover:bg-green-100"
              }
            >
              {round.status === RoundStatus.Completed
                ? "Completed"
                : "In Progress"}
            </Badge>
          </div>
          <div className="flex gap-2 items-center">
            {round.status === RoundStatus.Completed ? (
              <RoundDeleteButton
                number={round.number}
                onConfirm={handleDeleteRound}
              />
            ) : (
              <>
                {/*<AlertDialog>*/}
                {/*  <AlertDialogTrigger asChild>*/}
                {/*    <Tooltip delayDuration={1000}>*/}
                {/*      <TooltipTrigger asChild>*/}
                {/*        <Button variant="ghost">*/}
                {/*          <RotateCcw />*/}
                {/*        </Button>*/}
                {/*      </TooltipTrigger>*/}
                {/*      <TooltipContent>Reset scores</TooltipContent>*/}
                {/*    </Tooltip>*/}
                {/*  </AlertDialogTrigger>*/}
                {/*  <AlertDialogContent>*/}
                {/*    <AlertDialogHeader>*/}
                {/*      <AlertDialogTitle>Reset All Scores</AlertDialogTitle>*/}
                {/*      <AlertDialogDescription>*/}
                {/*        Are you sure you want to reset all scores for this round*/}
                {/*        to zero? This action cannot be undone.*/}
                {/*      </AlertDialogDescription>*/}
                {/*    </AlertDialogHeader>*/}
                {/*    <AlertDialogFooter>*/}
                {/*      <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                {/*      <AlertDialogAction*/}
                {/*        onClick={() => {*/}
                {/*          // resetRoundScores(round.id)*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        Reset*/}
                {/*      </AlertDialogAction>*/}
                {/*    </AlertDialogFooter>*/}
                {/*  </AlertDialogContent>*/}
                {/*</AlertDialog>*/}
                <SubmitButton
                  className="bg-gradient-to-r from-green-500 to-green-600 transition-all hover:from-green-600 hover:to-green-700"
                  onClick={handleCreateRound}
                  isLoading={isPending}
                >
                  Complete
                </SubmitButton>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="max-h-[300px] overflow-y-auto border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Player</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {round.scores.map((scoreEntry) => {
                const player = players.find(
                  (p) => p.id === scoreEntry.playerId,
                );
                if (!player) return null;
                return (
                  <TableRow key={`${round.number}-${player.id}`}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
                          {getInitials(player.full_name)}
                        </div>
                        <div>
                          <div>{player.full_name}</div>
                          {/*{player.house && (*/}
                          {/*  <div className="text-xs text-muted-foreground">*/}
                          {/*    {player.house}*/}
                          {/*  </div>*/}
                          {/*)}*/}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {round.status === RoundStatus.Completed ? (
                        <span className="text-lg font-semibold">
                          {scoreEntry.points}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              updateRoundScore(
                                round.number,
                                scoreEntry.playerId,
                                Math.max(0, scoreEntry.points - 1),
                              );
                            }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={scoreEntry.points}
                            onChange={(e) => {
                              updateRoundScore(
                                round.number,
                                scoreEntry.playerId,
                                Number.parseInt(e.target.value) || 0,
                              );
                            }}
                            className="w-20 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              updateRoundScore(
                                round.number,
                                scoreEntry.playerId,
                                scoreEntry.points + 1,
                              );
                            }}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
