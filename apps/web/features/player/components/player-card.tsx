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
  Trash2,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { Player, PlayerStatus } from "@workspace/types";

const getLevelColor = (level: string) => {
  switch (level) {
    case "Principiante":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "Intermedio":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case "Avanzato":
      return "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20";
    case "Esperto":
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

const getStatusColor = (status: PlayerStatus) => {
  switch (status) {
    case PlayerStatus.ACTIVE:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case PlayerStatus.INACTIVE:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

const getStatusText = (status: PlayerStatus) => {
  switch (status) {
    case PlayerStatus.ACTIVE:
      return "Attivo";
    case PlayerStatus.INACTIVE:
      return "Inattivo";
    default:
      return status;
  }
};

export function PlayerCard({
  player,
  onDelete,
}: {
  player: Player;
  onDelete: (id: string) => void;
}) {
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
                {getInitials(player.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{player.name}</CardTitle>
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
                <Link href={`/players/${player.id}`}>Visualizza Dettagli</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/players/${player.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifica
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(player.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Elimina
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-2">
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
                {/*Vittorie: {player.wins}/{player.matches}*/}
                Vittorie: 0
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              {/*<span>Win Rate: {player.winRate.toFixed(1)}%</span>*/}
              <span>Win Rate: 0%</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Win Rate</span>
              <span>50%</span>
              {/*<span>{player.winRate.toFixed(1)}%</span>*/}
            </div>
            <Progress value={50} className="h-2" />
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
