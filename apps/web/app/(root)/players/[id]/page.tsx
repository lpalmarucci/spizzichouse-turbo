import {
  GET_PLAYER_BY_ID,
  PLAYER_QUERY_KEY,
} from "@/features/player/player.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";
import React from "react";
import { PlayerDetail } from "@/features/player/components/player-detail";

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
      <PlayerDetail id={id} />
    </HydrationBoundary>
  );
}
