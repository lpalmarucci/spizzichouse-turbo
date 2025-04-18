import type React from "react";
import { PlayerEdit } from "@/features/player/components/edit/player-edit";
import { GET_PLAYER_BY_ID } from "@/features/player/player.query";
import { PreloadQuery } from "@/utils/apollo/server";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PreloadQuery query={GET_PLAYER_BY_ID} variables={{ id }}>
      <PlayerEdit id={id} />
    </PreloadQuery>
  );
}
