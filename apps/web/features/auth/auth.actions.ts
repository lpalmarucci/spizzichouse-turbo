"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PlayerLevel, PlayerStatus } from "@workspace/api/qgl-types";

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/");
  return { error: null };
}
export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const name = formData.get("name") as string;
  const lastName = formData.get("lastName") as string;
  const rawData = {
    full_name: name.concat(" ", lastName),
    bio: "A sample of player bio where the character",
    level: PlayerLevel.Beginner,
    status: PlayerStatus.Active,
  };
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: rawData },
  });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
  return { error: null };
}

export async function logout(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return;
  }
  revalidatePath("/");
  redirect("/");
}
