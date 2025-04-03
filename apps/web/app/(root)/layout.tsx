import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Separator } from "@workspace/ui/components/separator";
import { Drawer } from "@/components/drawer";

export default function LayoutDashboardPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <main className="w-full flex">
          <Drawer />
          <section className="p-2 w-full">
            <div className="w-full flex items-center py-2 h-14">
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <SidebarTrigger className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="bottom">Toggle drawer</TooltipContent>
              </Tooltip>
            </div>
            <Separator />
            <div className="py-4">{children}</div>
          </section>
        </main>
      </SidebarProvider>
    </>
  );
}
