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
import { Skeleton } from "@workspace/ui/components/skeleton";

export function RecentMatchTable({ id }: { id: string }) {
  const { data, isLoading } = useGetRecentMatchesByPlayer(id);

  if (isLoading) return <Skeleton />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Partite Recenti</CardTitle>
        <CardDescription>
          Ultime partite giocate da Luca Palmucci
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
