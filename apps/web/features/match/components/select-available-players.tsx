"use client";

import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Check, Loader2, Plus, Search, X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import UserAvatar from "@/components/user-avatar";
import React, { useState } from "react";
import { useGetPlayers } from "@/features/player/player.query";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface SelectAvailablePlayersProps<
  TFormValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFormValues> = FieldPath<TFormValues>,
> {
  field: ControllerRenderProps<TFormValues, TFieldName>;
}

export function SelectAvailablePlayers<
  TFormValues extends FieldValues,
  TFieldName extends FieldPath<TFormValues>,
>({ field }: SelectAvailablePlayersProps<TFormValues, TFieldName>) {
  const { data: players = [], isPending } = useGetPlayers();
  const [playerSearch, setPlayerSearch] = useState<string>("");

  const togglePlayer = (playerId: string) => {
    if (field.value.length > 0 && field.value.includes(playerId)) {
      field.onChange(() => {
        const filteredPlayers = field.value.filter(
          (id: string) => id !== playerId,
        );
        field.onChange([...filteredPlayers]);
      });
    } else {
      field.onChange(() => {
        field.onChange([...field.value, playerId]);
      });
    }
  };

  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader2 className=" h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <Label>Players</Label>
        <span className="text-sm text-muted-foreground">
          {field.value.length} selected
        </span>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Search players..."
            className="pl-8"
            onChange={(e) => setPlayerSearch(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        {field.value.length > 0 && (
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Selected Players</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => field.onChange([])}
                className="h-7 px-2 text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {field.value.map((id: string) => {
                const player = players.find((p) => p.id === id);
                return player ? (
                  <Badge
                    key={player.id}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {player.full_name}
                    <button
                      type="button"
                      className="ml-1 rounded-full hover:bg-muted p-1"
                      onClick={() => togglePlayer(player.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-3 py-2 border-b">
            <h4 className="text-sm font-medium">Available Players</h4>
          </div>
          <div className="max-h-[240px] overflow-y-auto p-1">
            {players
              .filter(
                (player) =>
                  !playerSearch ||
                  player.full_name
                    .toLowerCase()
                    .includes(playerSearch.toLowerCase()),
              )
              .map((player) => (
                <div
                  key={player.id}
                  className={`p-2 rounded-md cursor-pointer transition-colors flex items-center gap-2 mb-1 ${
                    field.value.includes(player.id)
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50 border border-transparent"
                  }`}
                  onClick={() => togglePlayer(player.id)}
                >
                  <UserAvatar name={player.full_name} />
                  <div className="flex-1">
                    <span className="text-sm font-medium">
                      {player.full_name}
                    </span>
                    {/*{player.house && (*/}
                    {/*  <p className="text-xs text-muted-foreground">*/}
                    {/*    House: {player.house}*/}
                    {/*  </p>*/}
                    {/*)}*/}
                  </div>
                  <div className="flex-shrink-0">
                    {field.value.includes(player.id) ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            {players.filter(
              (player) =>
                !playerSearch ||
                player.full_name
                  .toLowerCase()
                  .includes(playerSearch.toLowerCase()),
            ).length === 0 && (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No players found. Try a different search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
