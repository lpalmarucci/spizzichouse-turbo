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
import { useGetRecentMatchesByPlayer } from "@/features/match/match.hook";
import { formatDate } from "date-fns";
import { Badge } from "@workspace/ui/components/badge";
import { useGetPlayerById } from "@/features/player/player.hook";
import { ScreenLoader } from "@/components/screen-loader";

interface RecentMatchTableProps {
  id: string;
}

export function RecentMatchTable({ id }: RecentMatchTableProps) {
  const { data, isLoading } = useGetRecentMatchesByPlayer(id);
  const { data: playerData, isLoading: isLoadingPlayer } = useGetPlayerById(id);

  if (isLoading || isLoadingPlayer) return <ScreenLoader />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Partite Recenti</CardTitle>
        <CardDescription>
          Ultime partite giocate da {playerData?.player.full_name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Posizione</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.recent_matches.map((match, idx) => {
              return (
                <TableRow key={`${match.id}-${idx}`}>
                  <TableCell>{match.title}</TableCell>
                  <TableCell>{formatDate(match.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={match.position === 1 ? "default" : "outline"}
                    >
                      {match.position}° posto
                    </Badge>
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
