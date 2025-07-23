'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Button } from '@workspace/ui/components/button';
import { MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type PlayerCardActionsProps = {
  playerId: string;
};

export const PlayerCardActions: React.FC<PlayerCardActionsProps> = ({ playerId }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Azioni giocatore" tabIndex={0}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href={`/players/${playerId}/edit`} tabIndex={0} aria-label="Modifica giocatore">
          <Pencil className="mr-2 h-4 w-4" />
          Modifica
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
