"use server";

import { revalidatePath } from "next/cache";
import { getClient } from "@/utils/apollo/server";
import {
  CREATE_MATCH,
  DELETE_MATCH,
  UPDATE_MATCH,
} from "@/features/match/match.query";
import { CreateMatch, UpdateMatch } from "@workspace/api/qgl-types";

export async function createMatchAction(createMatch: CreateMatch) {
  try {
    const client = getClient();

    await client.mutate({
      mutation: CREATE_MATCH,
      variables: {
        match: createMatch,
      },
    });
    revalidatePath("/matches");

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateMatchAction(id: string, updateMatch: UpdateMatch) {
  try {
    const client = getClient();

    await client.mutate({
      mutation: UPDATE_MATCH,
      variables: {
        id,
        match: updateMatch,
      },
    });
    revalidatePath(`/matches/${id}`);

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteMatchAction(id: string) {
  try {
    const client = getClient();

    await client.mutate({
      mutation: DELETE_MATCH,
      variables: {
        id,
      },
    });
    revalidatePath(`/matches`);

    return { error: null };
  } catch (err: any) {
    return { error: err.message };
  }
}
