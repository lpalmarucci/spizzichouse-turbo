"use client";

import { useGetPlayerById } from "@/features/player/player.query";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { PlayerDetailCard } from "@/features/player/components/player-detail-card";

interface PlayerDetailProps {
  id: string;
}

export function PlayerDetail({ id }: PlayerDetailProps) {
  const { data, isLoading } = useGetPlayerById(id);

  // if (isLoading) return <span>Loading...</span>;

  console.log({ data });

  if (!data) return <span>User not found</span>;

  return (
    <div className="w-full py-2 flex flex-col justify-center gap-4">
      <div className="w-full flex items-center gap-4">
        <Button asChild size="lg" variant="outline" className="cursor-pointer">
          <Link href="/players">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="w-full flex grow items-center justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Dettaglio giocatore
            </h1>
            <p className="text-muted-foreground">
              Profilo giocatore e statistiche
            </p>
          </div>
          <Button asChild className="gap-4 cursor-pointer">
            <Link href={`/players/${id}/edit`}>
              <Edit />
              Modifica
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <PlayerDetailCard player={data} />
      </div>
    </div>
  );
}
