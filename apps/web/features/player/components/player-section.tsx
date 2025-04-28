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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { PlayerCard } from "@/features/player/components/player-card";
import { useMemo, useState } from "react";
import { Player, PlayerLevel, PlayerStatus } from "@workspace/api/qgl-types";
import { PlayersNotFound } from "@/features/player/components/players-not-found";
import { useGetPlayers } from "@/features/player/player.hook";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ScreenLoader } from "@/components/screen-loader";

type SortDirection = "asc" | "desc";

export function PlayerSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<PlayerLevel | undefined>();
  const [statusFilter, setStatusFilter] = useState<PlayerStatus | undefined>();
  const [sortField, setSortField] = useState<keyof Player>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const { data, isFetching, error } = useGetPlayers();

  const filteredPlayers = useMemo(() => {
    if (!data || !data?.players) return [];
    return data.players.filter((player) => {
      if (
        searchQuery &&
        !player.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (levelFilter && player.level !== levelFilter) {
        return false;
      }

      return !(statusFilter && player.status !== statusFilter);
    });
  }, [data, searchQuery, statusFilter]);

  const sortedPlayers = useMemo<Player[]>(() => {
    if (!filteredPlayers) return [];
    return filteredPlayers.sort((a: Player, b: Player) => {
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
  }, [filteredPlayers, sortField]);

  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect("/");
    }, 500);
    return;
  }

  if (isFetching) {
    return <ScreenLoader />;
  }

  if (!data) {
    toast.warning("No players found!");
    setTimeout(() => {
      redirect("/");
    }, 500);
    return;
  }

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
          <Select
            defaultValue={levelFilter}
            onValueChange={(val: PlayerLevel) => setLevelFilter(val)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filtra per livello" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Principiante">Principiante</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzato">Avanzato</SelectItem>
              <SelectItem value="Esperto">Esperto</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={statusFilter}
            onValueChange={(val: PlayerStatus) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Attivo</SelectItem>
              <SelectItem value="inactive">Inattivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-background border">
          <TabsTrigger value="all">Tutti i Giocatori</TabsTrigger>
          <TabsTrigger value="active">Attivi</TabsTrigger>
          <TabsTrigger value="inactive">Inattivi</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {sortedPlayers?.length == 0 ? (
            <div>
              <PlayersNotFound
                searchQuery={searchQuery}
                levelFilter={levelFilter}
                statusFilter={statusFilter}
                onClearSearch={() => setSearchQuery("")}
                onClearFilters={() => {
                  setLevelFilter(undefined);
                  setStatusFilter(undefined);
                }}
                onResetAll={() => {
                  setSearchQuery("");
                  setLevelFilter(undefined);
                  setStatusFilter(undefined);
                }}
              />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sortedPlayers.map((player) => (
                <div key={player.id}>
                  <PlayerCard player={player} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedPlayers
              .filter((player) => player.status === PlayerStatus.Active)
              .map((player) => (
                <div key={player.id}>
                  <PlayerCard player={player} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedPlayers
              .filter((player) => player.status === PlayerStatus.Inactive)
              .map((player) => (
                <div key={player.id}>
                  <PlayerCard player={player} />
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
