import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/signin");
  }

  console.log(await supabase.auth.getSession());

  return (
    <div className="container mx-auto w-full flex items-center justify-center">
      <SidebarTrigger />
      <h1 className="text-2xl tracking-tight font-bold">Dashboard</h1>
    </div>
  );
}
