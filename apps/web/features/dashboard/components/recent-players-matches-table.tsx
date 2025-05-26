"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { useGetMatches } from "@/features/match/match.hook";
import { MatchStatus, SortOrder } from "@workspace/api/qgl-types";
import { formatDate } from "date-fns";
import UserAvatar from "@/components/user-avatar";
import { getStatusColor, getStatusText } from "@/features/match/match.utils";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";
import { orderRoundsByScore } from "@/utils/leaderboard";

export function RecentPlayersMatchesTable() {
  const { data, isLoading } = useGetMatches({
    take: 10,
    matchOrderBy: {
      date: SortOrder.Desc,
    },
  });

  if (isLoading) return <Skeleton />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
        <CardDescription>
          Latest completed and in-progress matches
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Match</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Players</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.matches.map((match) => {
              let winner: string | undefined;
              if (
                match.status === MatchStatus.Completed &&
                match.rounds.length > 0
              ) {
                const leader = orderRoundsByScore(match.rounds).at(0);
                if (leader) {
                  winner = match.players.find(
                    (p) => p.id === leader.player.id,
                  )?.full_name;
                }
              }

              return (
                <TableRow key={match.id}>
                  <TableCell>{match.title}</TableCell>
                  <TableCell>{formatDate(match.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center -space-x-2.5 overflow-hidden">
                      {match.players.map((player) => (
                        <Tooltip key={`${match.id}-${player.id}`}>
                          <TooltipTrigger>
                            <UserAvatar name={player.full_name} />
                          </TooltipTrigger>
                          <TooltipContent>{player.full_name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {match.status === MatchStatus.Completed ? winner : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(match.status)}>
                      {getStatusText(match.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" asChild>
                      <Link href={`/matches/${match.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
