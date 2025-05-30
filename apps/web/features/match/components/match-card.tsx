"use client";

import {
  Calendar,
  CalendarX2,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import UserAvatar from "@/components/user-avatar";
import { Match, MatchStatus, Player } from "@workspace/api/qgl-types";
import { getStatusColor } from "@/features/match/match.utils";
import { useState, useTransition } from "react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { updateMatchAction } from "@/features/match/match.actions";
import { toast } from "sonner";

export function MatchCard({
  match,
  onDelete,
}: {
  match: Match;
  onDelete: (id: string) => void;
}) {
  const [isEndMatchDialogOpen, setIsEndMatchDialogOpen] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-UK");
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case MatchStatus.Upcoming:
        return "Upcoming";
      case MatchStatus.InProgress:
        return "In Progress";
      case MatchStatus.Completed:
        return "Completed";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  function handleEndMatch() {
    startTransition(async () => {
      const { error } = await updateMatchAction(match.id, {
        status: MatchStatus.Completed,
      });
      if (error) {
        toast.error(error);
        return;
      }
      toast.info("Partita terminata correttamente");
      setIsEndMatchDialogOpen(false);
    });
  }

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{match.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[MatchStatus.Upcoming, MatchStatus.InProgress].includes(
                  match.status,
                ) && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={`/matches/${match.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsEndMatchDialogOpen(true)}
                    >
                      <CalendarX2 className="mr-2 h-4 w-4" />
                      Termina partita
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={() => onDelete(match.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(match.status)}>
              {getStatusText(match.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span>
                {match.duration
                  ? `${match.duration}m`
                  : "Durata non disponibile"}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="mr-2 h-4 w-4 opacity-70" />
              <span>{match.players.length} players</span>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Players:</p>
              <div className="flex -space-x-2 overflow-hidden">
                {match.players.slice(0, 5).map((player: Player) => (
                  <UserAvatar name={player.full_name} key={player.id} />
                ))}
                {match.players.length > 5 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                    +{match.players.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/matches/${match.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        open={isEndMatchDialogOpen}
        onOpenChange={setIsEndMatchDialogOpen}
        onConfirm={handleEndMatch}
        title="Sei sicuro di voler terminare la partita?"
        subtitle="Non potrai più modificare i vari punteggi"
        isPending={isPending}
      />
    </>
  );
}
