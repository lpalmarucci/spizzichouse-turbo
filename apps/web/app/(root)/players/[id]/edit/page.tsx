import type React from "react";
import { PlayerEdit } from "@/features/player/components/edit/player-edit";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPlayerById } from "@/features/player/player.actions";
import { PLAYER_QUERY_KEY } from "@/features/player/player.query";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PLAYER_QUERY_KEY, id],
    queryFn: () => getPlayerById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlayerEdit id={id} />
    </HydrationBoundary>
  );
}
