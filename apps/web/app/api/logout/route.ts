import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => cookieStore.delete(cookie.name));
  redirect("/");
}
