import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPlayerById } from "@/features/player/player.actions";
import { PLAYER_QUERY_KEY } from "@/features/player/player.query";
import { PlayerDetail } from "@/features/player/components/player-detail";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const instance = this;
  const getPlayerByIdBinded = getPlayerById.bind(instance, id);

  await queryClient.prefetchQuery({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: getPlayerById.bind(instance, id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlayerDetail id={id} />
    </HydrationBoundary>
  );
}
