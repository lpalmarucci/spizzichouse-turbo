"use client";

import { Round, RoundStatus } from "@workspace/api/qgl-types";
import { getStatusColor } from "@/features/rounds/rounds.utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { RotateCcw, Table, Trash2 } from "lucide-react";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Label } from "@workspace/ui/components/label";

interface RoundCardProps {
  round: Round;
}

export default function RoundCard({ round }: RoundCardProps) {
  function deleteRound(id: string) {}

  return (
    <Card key={round.id} className="overflow-hidden">
      <div className={`h-1 w-full ${getStatusColor(round.status)}`} />
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Round {round.number}</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this round? This action cannot
                  be undone and all scores for this round will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteRound(round.id)}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
              {/*{round.map((scoreEntry) => {*/}
              {/*  const player = getPlayerById(scoreEntry.playerId, players);*/}
              {/*  if (!player) return null;*/}

              {/*  return (*/}
              {/*    <TableRow key={scoreEntry.playerId}>*/}
              {/*      <TableCell className="font-medium">*/}
              {/*        <div className="flex items-center gap-2">*/}
              {/*          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">*/}
              {/*            {player.name.charAt(0).toUpperCase()}*/}
              {/*          </div>*/}
              {/*          <div>*/}
              {/*            <div>{player.name}</div>*/}
              {/*            {player.house && (*/}
              {/*              <div className="text-xs text-muted-foreground">*/}
              {/*                {player.house}*/}
              {/*              </div>*/}
              {/*            )}*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </TableCell>*/}
              {/*      <TableCell>*/}
              {/*        {round.status === RoundStatus.Completed ? (*/}
              {/*          <span className="text-lg font-semibold">*/}
              {/*            {scoreEntry.score}*/}
              {/*          </span>*/}
              {/*        ) : (*/}
              {/*          <div className="flex items-center gap-2">*/}
              {/*            <Button*/}
              {/*              variant="outline"*/}
              {/*              size="icon"*/}
              {/*              className="h-8 w-8"*/}
              {/*              onClick={() => {*/}
              {/*                // updateRoundScore(*/}
              {/*                //   round.id,*/}
              {/*                //   scoreEntry.playerId,*/}
              {/*                //   Math.max(0, scoreEntry.score - 1),*/}
              {/*                // );*/}
              {/*              }}*/}
              {/*            >*/}
              {/*              <ChevronDown className="h-4 w-4" />*/}
              {/*            </Button>*/}
              {/*            <Input*/}
              {/*              type="number"*/}
              {/*              value={scoreEntry.score}*/}
              {/*              onChange={(e) => {*/}
              {/*                // updateRoundScore(*/}
              {/*                //   round.id,*/}
              {/*                //   scoreEntry.playerId,*/}
              {/*                //   Number.parseInt(e.target.value) || 0,*/}
              {/*                // )*/}
              {/*              }}*/}
              {/*              className="w-20 text-center"*/}
              {/*            />*/}
              {/*            <Button*/}
              {/*              variant="outline"*/}
              {/*              size="icon"*/}
              {/*              className="h-8 w-8"*/}
              {/*              onClick={() => {*/}
              {/*                // updateRoundScore(*/}
              {/*                //   round.id,*/}
              {/*                //   scoreEntry.playerId,*/}
              {/*                //   scoreEntry.score + 1,*/}
              {/*                // );*/}
              {/*              }}*/}
              {/*            >*/}
              {/*              <ChevronUp className="h-4 w-4" />*/}
              {/*            </Button>*/}
              {/*          </div>*/}
              {/*        )}*/}
              {/*      </TableCell>*/}
              {/*    </TableRow>*/}
              {/*  );*/}
              {/*})}*/}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={`notes-${round.id}`}>Round Notes</Label>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset Scores
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset All Scores</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to reset all scores for this round to
                    zero? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      // resetRoundScores(round.id)
                    }}
                  >
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
