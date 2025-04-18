"use server";

import { UpdatePlayer } from "@workspace/api/qgl-types";
import { UPDATE_PLAYER } from "@/features/player/player.query";
import { revalidatePath } from "next/cache";
import { gqlRequest } from "@/utils/query";

export async function updatePlayerAction(
  id: string,
  updatePlayer: UpdatePlayer,
) {
  try {
    await gqlRequest(UPDATE_PLAYER, { id, player: updatePlayer });

    revalidatePath(`/players/${id}`);
  } catch (e: any) {
    return { error: e.message };
  }
}
