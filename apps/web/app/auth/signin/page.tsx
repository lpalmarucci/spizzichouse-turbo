import { LoginForm } from "@/features/auth/components/login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
