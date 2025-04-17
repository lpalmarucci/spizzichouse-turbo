"use server";

import { handleRequest } from "@/api/api-handler";
import { CreateMatch, Match, UpdateMatch } from "@workspace/api/qgl-types";
import { revalidatePath } from "next/cache";

export async function getMatches() {
  return handleRequest<Match[]>("GET", "/matches");
}

export async function getMatchById(id: string) {
  return handleRequest<Match>("GET", `/matches/${id}`);
}

export async function createMatch(match: CreateMatch) {
  const data = await handleRequest<Match[]>("POST", `/matches`, match);
  revalidatePath(`/matches`);
  return data;
}

export async function editMatch(id: string, match: UpdateMatch) {
  const data = await handleRequest<Match[]>("PATCH", `/matches/${id}`, match);
  revalidatePath(`/matches/${id}`);
  return data;
}

export async function deleteMatch(id: string) {
  await handleRequest("DELETE", `/matches/${id}`);
  revalidatePath("/matches", "page");
}
