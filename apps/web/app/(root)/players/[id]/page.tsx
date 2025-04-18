import { PreloadQuery } from "@/utils/apollo/server";
import { GET_PLAYER_BY_ID } from "@/features/player/player.query";
import { Detail, DetailHeader } from "@/components/detail";
import { PlayerDetailCard } from "@/features/player/components/player-detail-card";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PreloadQuery query={GET_PLAYER_BY_ID} variables={{ id }}>
      <Detail>
        <DetailHeader
          headingText="Dettaglio giocatore"
          subHeadingText="Profilo giocatore e statistiche"
          showEditButton={true}
          editButtonText="Modifica"
          backLocationHref="/players"
        />
        <div className="grid lg:grid-cols-2">
          <PlayerDetailCard id={id} />
        </div>
      </Detail>
    </PreloadQuery>
  );
}
