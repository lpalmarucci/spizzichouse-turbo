"use client";

import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { useSession } from "@clerk/nextjs";

export default function DashboardPage() {
  const auth = useSession();

  auth.session?.getToken().then(console.log);

  return (
    <div className="container w-full flex items-center justify-center">
      <SidebarTrigger />
      <h1 className="text-2xl tracking-tight font-bold">Dashboard</h1>
    </div>
  );
}
