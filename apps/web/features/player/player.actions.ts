"use server";

import { Player } from "@workspace/db";
import { handleRequest } from "@/api/api-handler";
import { ApiResponse, isResponseError } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getPlayers() {
  return handleRequest<Player[]>("GET", "/players");
}

export async function getPlayerById(id: string) {
  return handleRequest<Player>("GET", `/players/${id}`);
}

export async function updatePlayer(
  state: ApiResponse,
  formData: FormData,
): Promise<ApiResponse> {
  const player = Object.fromEntries(formData.entries()) as unknown as Player;
  const response = await handleRequest<Player>(
    "PATCH",
    `/players/${player.id}`,
    player,
  );
  if (isResponseError(response))
    return { status: false, error: response.error };
  revalidatePath(`/players/${player.id}`);
  return { status: true };
}
