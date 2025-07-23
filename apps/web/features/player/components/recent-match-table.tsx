'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@workspace/ui/components/table';
import { useGetRecentMatchesByPlayer } from '@/features/match/match.hook';
import { useGetPlayerById } from '@/features/player/player.hook';
import { RecentMatchTableRow } from './recent-match-table-row';

interface RecentMatchTableProps {
  id: string;
}

export function RecentMatchTable({ id }: RecentMatchTableProps) {
  const {
    data: { recentMatches },
  } = useGetRecentMatchesByPlayer(id);
  const {
    data: { player },
  } = useGetPlayerById(id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Partite Recenti</CardTitle>
        <CardDescription>Ultime partite giocate da {player.full_name}</CardDescription>
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
            {recentMatches.map((match, idx) => (
              <RecentMatchTableRow match={match} idx={idx} key={match.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
