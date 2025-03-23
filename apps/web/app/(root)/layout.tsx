import { Drawer } from "@/components/drawer";
import { SidebarProvider } from "@workspace/ui/components/sidebar";

export default function LayoutDashboardPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main className="w-full flex">
        <Drawer />
        <section className="px-4 py-6 w-full">{children}</section>
      </main>
    </SidebarProvider>
  );
}
