import { TableRow, TableCell } from '@workspace/ui/components/table';
import { Badge } from '@workspace/ui/components/badge';
import { formatDate } from '@/features/player/utils';
import React from 'react';

type RecentMatchTableRowProps = {
  match: any;
  idx: number;
};

export const RecentMatchTableRow: React.FC<RecentMatchTableRowProps> = ({ match, idx }) => (
  <TableRow key={`${match.id}-${idx}`} tabIndex={0} aria-label={`Partita ${match.title}`}>
    <TableCell>{match.title}</TableCell>
    <TableCell>{formatDate(match.date)}</TableCell>
    <TableCell>
      <Badge variant={match.position === 1 ? 'default' : 'outline'}>{match.position}° posto</Badge>
    </TableCell>
  </TableRow>
);
