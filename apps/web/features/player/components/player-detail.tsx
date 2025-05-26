"use client";

import { Detail, DetailHeader } from "@/components/detail";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Edit } from "lucide-react";
import { PlayerDetailCard } from "@/features/player/components/player-detail-card";
import React from "react";
import { usePathname } from "next/navigation";
import PlayerStats from "@/features/player/components/player-stats";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { RecentMatchTable } from "@/features/player/components/recent-match-table";

export function PlayerDetail({ id }: { id: string }) {
  const pathname = usePathname();
  return (
    <Detail>
      <DetailHeader
        headingText="Dettaglio giocatore"
        subHeadingText="Profilo giocatore e statistiche"
        backLocationHref="/players"
      >
        <Button asChild>
          <Link href={`${pathname}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit player
          </Link>
        </Button>
      </DetailHeader>
      <div className="grid lg:grid-cols-2 gap-4">
        <PlayerDetailCard id={id} />
        <PlayerStats id={id} />
      </div>
      <div className="mt-4">
        <Tabs defaultValue="recent_matches">
          <TabsList>
            <TabsTrigger value="recent_matches">Partite recenti</TabsTrigger>
            <TabsTrigger value="opponents">Avversari</TabsTrigger>
          </TabsList>
          <TabsContent value="recent_matches">
            <RecentMatchTable id={id} />
          </TabsContent>
        </Tabs>
      </div>
    </Detail>
  );
}
