import { query } from "@/utils/apollo/server";
import { GET_PLAYER_BY_ID } from "@/features/player/player.query";
import { Player } from "@workspace/api/qgl-types";
import { Detail, DetailHeader } from "@/components/detail";
import { PlayerDetailCard } from "@/features/player/components/player-detail-card";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await query<{ player: Player }>({
    query: GET_PLAYER_BY_ID,
    variables: { id },
  });

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
        <PlayerDetailCard player={data.player} />
      </div>
    </Detail>
  );
}
