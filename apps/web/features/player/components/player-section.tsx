"use client";

import { Search } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { PlayerCard } from "@/features/player/components/player-card";
import { useState } from "react";
import { Player, PlayerStatus } from "@workspace/types";
import { useGetPlayers } from "@/features/player/player.query";

type SortField =
  | "name"
  | "matches"
  | "wins"
  | "winRate"
  | "avgPosition"
  | "level"
  | "lastActive";
type SortDirection = "asc" | "desc";

interface PlayerSectionProps {
  data: any[];
}

export function PlayerSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Player>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { data, refetch } = useGetPlayers();

  // console.log({ data });

  const handleDeletePlayer = (id: string) => {
    // refetch();
    // setPlayersList(playersList?.filter((player) => player.id !== id));
  };

  // const { data } = useGetPlayers();
  // console.log({ data });

  // Filtra i giocatori in base ai criteri
  const filteredPlayers =
    data?.filter((player) => {
      // Filtra per ricerca
      if (
        searchQuery &&
        !player.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filtra per livello
      if (levelFilter !== "all" && player.level !== levelFilter) {
        return false;
      }

      // Filtra per stato
      if (statusFilter !== "all" && player.status !== statusFilter) {
        return false;
      }

      return true;
    }) ?? [];

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (!aValue || !bValue) return -1;

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? (aValue as unknown as number) - (bValue as unknown as number)
      : (bValue as unknown as number) - (aValue as unknown as number);
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca giocatori..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select defaultValue={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filtra per livello" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i livelli</SelectItem>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzato">Avanzato</SelectItem>
              <SelectItem value="Esperto">Esperto</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli stati</SelectItem>
              <SelectItem value="active">Attivo</SelectItem>
              <SelectItem value="inactive">Inattivo</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("table")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-background border">
          <TabsTrigger value="all">Tutti i Giocatori</TabsTrigger>
          <TabsTrigger value="active">Attivi</TabsTrigger>
          <TabsTrigger value="inactive">Inattivi</TabsTrigger>
          <TabsTrigger value="top">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PlayerCard player={player} onDelete={handleDeletePlayer} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedPlayers
              .filter((player) => player.status === PlayerStatus.ACTIVE)
              .map((player, index) => (
                <div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PlayerCard player={player} onDelete={handleDeletePlayer} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedPlayers
              .filter((player) => player.status === PlayerStatus.INACTIVE)
              .map((player, index) => (
                <div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PlayerCard player={player} onDelete={handleDeletePlayer} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="top" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedPlayers
              // .sort((a, b) => b.winRate - a.winRate)
              .slice(0, 6)
              .map((player, index) => (
                <div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PlayerCard player={player} onDelete={handleDeletePlayer} />
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
