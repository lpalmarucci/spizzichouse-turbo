import type React from "react";
import { PlayerEdit } from "@/features/player/components/edit/player-edit";
import { Player } from "@workspace/api/qgl-types";
import { query } from "@/utils/apollo/server";
import { GET_PLAYER_BY_ID } from "@/features/player/player.query";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await query<{ player: Player }>({
    query: GET_PLAYER_BY_ID,
    variables: { id },
  });

  return <PlayerEdit player={data.player} id={id} />;
}
