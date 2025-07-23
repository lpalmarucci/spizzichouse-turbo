import { Match, MatchStatus } from '@workspace/api/qgl-types';
import { CalendarX2, Trash2 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

interface MatchCardActionsProps {
  match: Match;
  onEnd: () => void;
  onDelete: () => void;
}

function MatchCardActions({ match, onEnd, onDelete }: MatchCardActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {[MatchStatus.Upcoming, MatchStatus.InProgress].includes(match.status) && (
          <>
            <DropdownMenuItem asChild>
              <Link href={`/matches/${match.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEnd}>
              <CalendarX2 className="mr-2 h-4 w-4" />
              Termina partita
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4 text-destructive" />
          <span className="text-destructive">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MatchCardActions;
