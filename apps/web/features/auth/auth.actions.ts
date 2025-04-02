"use server";

import { handleRequest } from "@/api/api-handler";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type UserInfo = {
  sub: string;
  name: string;
  email: string;
};

export async function getUserInfo(): Promise<UserInfo> {
  return handleRequest<UserInfo>("GET", "/me");
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}
export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}
