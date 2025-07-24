import React from 'react';
import { Round, RoundStatus } from '@workspace/api/qgl-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { getInitials } from '@/features/player/utils';

interface RoundCardTableProps {
  round: Round;
  status: RoundStatus;
  onUpdateScore: (number: number, playerId: string, score: number) => void;
}

export const RoundCardTable: React.FC<RoundCardTableProps> = ({ round, status, onUpdateScore }) => (
  <div className="max-h-[300px] overflow-y-auto border rounded-md ">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%]">Player</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {round.scores.map((scoreEntry) => (
          <TableRow key={`${round.number}-${scoreEntry.player.id}`}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
                  {getInitials(scoreEntry.player.full_name)}
                </div>
                <div>
                  <div>{scoreEntry.player.full_name}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {status === RoundStatus.Completed ? (
                <span className="text-lg font-semibold">{scoreEntry.points}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      onUpdateScore(round.number, scoreEntry.player.id, Math.max(0, scoreEntry.points - 1));
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={scoreEntry.points}
                    onChange={(e) => {
                      onUpdateScore(round.number, scoreEntry.player.id, Number.parseInt(e.target.value) || 0);
                    }}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      onUpdateScore(round.number, scoreEntry.player.id, scoreEntry.points + 1);
                    }}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
