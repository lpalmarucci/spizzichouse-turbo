"use server";

import { Player } from "@workspace/db";
import { handleRequest } from "@/api/api-handler";

export async function getPlayers() {
  return handleRequest<Player[]>("GET", "/players");
}

export async function getPlayerById(id: string) {
  return handleRequest<Player[]>("GET", `/players/${id}`);
}
