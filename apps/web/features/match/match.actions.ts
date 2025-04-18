"use server";

import { revalidatePath } from "next/cache";
import {
  CREATE_MATCH,
  DELETE_MATCH,
  UPDATE_MATCH,
} from "@/features/match/match.query";
import { CreateMatch, UpdateMatch } from "@workspace/api/qgl-types";
import { gqlRequest } from "@/utils/query";

export async function createMatchAction(createMatch: CreateMatch) {
  try {
    await gqlRequest(CREATE_MATCH, {
      match: createMatch,
    });
    revalidatePath("/matches");

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateMatchAction(id: string, updateMatch: UpdateMatch) {
  try {
    await gqlRequest(UPDATE_MATCH, {
      id,
      match: updateMatch,
    });
    revalidatePath(`/matches/${id}`);

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteMatchAction(id: string) {
  try {
    await gqlRequest(DELETE_MATCH, {
      id,
    });
    revalidatePath(`/matches`);

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}
