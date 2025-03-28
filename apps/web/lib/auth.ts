import { cookies } from "next/headers";

export async function getSession() {
  const cookie = await cookies();
  return cookie.get("session")?.value;
}
