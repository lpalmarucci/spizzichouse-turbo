"use server";

import { handleRequest } from "@/api/api-handler";
import { Match, MatchWithPlayers } from "@workspace/db";
import { revalidatePath } from "next/cache";

type CreateMatchDto = Omit<Match, "id">;
type UpdateMatchDto = Partial<Match>;

export async function getMatches() {
  return handleRequest<MatchWithPlayers[]>("GET", "/matches");
}

export async function getMatchById(id: string) {
  return handleRequest<MatchWithPlayers>("GET", `/matches/${id}`);
}

export async function createMatch(match: CreateMatchDto) {
  const data = await handleRequest<MatchWithPlayers[]>(
    "POST",
    `/matches`,
    match,
  );
  revalidatePath(`/matches`);
  return data;
}

export async function editMatch(match: UpdateMatchDto) {
  const data = await handleRequest<MatchWithPlayers[]>(
    "PATCH",
    `/matches/${match.id}`,
    match,
  );
  revalidatePath(`/matches/${match.id}`);
  return data;
}

export async function deleteMatch(id: string) {
  await handleRequest("DELETE", `/matches/${id}`);
  revalidatePath("/matches", "page");
}
