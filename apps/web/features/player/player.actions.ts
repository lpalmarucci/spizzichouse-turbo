"use server";

import { Player } from "@workspace/db";
import { handleRequest } from "@/api/api-handler";
import { revalidatePath } from "next/cache";

export async function getPlayers() {
  return handleRequest<Player[]>("GET", "/players");
}

export async function getPlayerById(id: string) {
  return handleRequest<Player>("GET", `/players/${id}`);
}

export async function updatePlayer(player: Player) {
  const data = await handleRequest<Player>(
    "PATCH",
    `/players/${player.id}`,
    player,
  );
  revalidatePath(`/players/${player.id}`);
  return data;
}
