"use server";

import { UpdatePlayer } from "@workspace/api/qgl-types";
import { getClient } from "@/utils/apollo/server";
import { UPDATE_PLAYER } from "@/features/player/player.query";
import { revalidatePath } from "next/cache";

export async function updatePlayerAction(
  id: string,
  updatePlayer: UpdatePlayer,
) {
  try {
    const client = getClient();

    await client.mutate({
      mutation: UPDATE_PLAYER,
      variables: {
        id,
        player: updatePlayer,
      },
    });

    revalidatePath(`/players/${id}`);
  } catch (e: any) {
    return { error: e.message };
  }
}
