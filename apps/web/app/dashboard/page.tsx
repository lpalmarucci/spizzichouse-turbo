import { SidebarTrigger } from "@workspace/ui/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="container w-full flex items-center justify-center">
      <SidebarTrigger />
      <h1 className="text-2xl tracking-tight font-bold">Dashboard</h1>
    </div>
  );
}
