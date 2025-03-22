import { Drawer } from "@/components/drawer";
import { SidebarProvider } from "@workspace/ui/components/sidebar";

export default function LayoutDashboardPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="w-full flex">
        <Drawer />
        {children}
      </div>
    </SidebarProvider>
  );
}
