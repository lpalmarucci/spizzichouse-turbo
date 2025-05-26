import {
  GET_PLAYER_BY_ID,
  GET_PLAYER_STATS,
  PLAYER_QUERY_KEY,
  PLAYERS_STATS_QUERY_KEY,
} from "@/features/player/player.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";
import React from "react";
import { PlayerDetail } from "@/features/player/components/player-detail";
import {
  GET_RECENT_MATCHES_BY_PLAYER,
  MATCH_QUERY_KEY,
  RECENT_MATCH_BY_PLAYER,
} from "@/features/match/match.query";

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

  await queryClient.prefetchQuery({
    queryKey: [PLAYERS_STATS_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_PLAYER_STATS, { id }),
  });

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, RECENT_MATCH_BY_PLAYER, id],
    queryFn: () => gqlRequest(GET_RECENT_MATCHES_BY_PLAYER, { id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlayerDetail id={id} />
    </HydrationBoundary>
  );
}
