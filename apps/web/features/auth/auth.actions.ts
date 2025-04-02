"use server";

import { handleRequest } from "@/api/api-handler";
import { createClient } from "@/utils/supabase/server";
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
  };
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: rawData },
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
  return { error: null };
}
