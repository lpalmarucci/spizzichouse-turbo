"use client";

import { useGetPlayerById } from "@/features/player/player.query";
import { PlayerDetailCard } from "@/features/player/components/player-detail-card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ScreenLoader } from "@/components/screen-loader";
import { Detail, DetailHeader } from "@/components/detail";

interface PlayerDetailProps {
  id: string;
}

export function PlayerDetail({ id }: PlayerDetailProps) {
  const { data, error, isFetching } = useGetPlayerById(id);
  const router = useRouter();

  if (isFetching) return <ScreenLoader />;
  if (error) {
    toast(`Player ${id} not found`, { id });
    router.push("/players");
    return;
  }
  if (!data) return;

  return (
    <Detail>
      <DetailHeader
        headingText="Dettaglio giocatore"
        subHeadingText="Profilo giocatore e statistiche"
        showEditButton={true}
        editButtonText="Modifica"
        backLocationHref="/players"
      />
      <div className="grid lg:grid-cols-2">
        <PlayerDetailCard player={data} />
      </div>
    </Detail>
  );
}
