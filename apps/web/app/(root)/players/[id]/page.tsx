import {
  GET_PLAYER_BY_ID,
  PLAYER_QUERY_KEY,
} from "@/features/player/player.query";
import { Detail, DetailHeader } from "@/components/detail";
import { PlayerDetailCard } from "@/features/player/components/player-detail-card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_BY_ID, { id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
