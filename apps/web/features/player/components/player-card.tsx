"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import {
  Calendar,
  House,
  MoreHorizontal,
  Pencil,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import {
  getLevelColor,
  getStatusColor,
  getStatusText,
} from "@/features/player/utils";
import { PlayerStats } from "@workspace/api/qgl-types";

export function PlayerCard({ player }: { player: PlayerStats }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(player.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{player.full_name}</CardTitle>
              <CardDescription>{player.email}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/players/${player.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifica
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={getLevelColor(player.level)}>{player.level}</Badge>
          <Badge className={getStatusColor(player.status)}>
            {getStatusText(player.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span>
                Vittorie: {player.wins}/{player.total_matches}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              <span>Win Rate: {player.win_rate.toFixed(0)}%</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Win Rate</span>
              <span>{player.win_rate.toFixed(0)}%</span>
            </div>
            <Progress value={player.win_rate} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                Iscritto:{" "}
                {new Date(player.createdAt).toLocaleDateString("en-UK")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <House className="h-4 w-4 text-muted-foreground" />
              <span>Principato</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/players/${player.id}`}>Visualizza Profilo</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
