"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScrollText,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { UserDropdown } from "@/components/user-drodown";

export function Drawer() {
  const pathname = usePathname();
  const sidebar = useSidebar();

  const routes = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/matches",
      icon: Trophy,
      title: "Matches",
    },
    {
      href: "/players",
      icon: Users,
      title: "Players",
    },
    {
      href: "/rule-sets",
      icon: ScrollText,
      title: "Rule Sets",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Settings",
    },
  ];

  return (
    <>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <SidebarMenuButton className="h-full">
            <div className="flex items-center gap-2 font-semibold h-full">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-xl">Spizzichouse</span>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((route) => (
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.includes(route.href)}
                      tooltip={route.title}
                    >
                      <Link href={route.href}>
                        <route.icon className="h-4 w-4" />
                        <span>{route.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <div className="inline-flex items-center justify-center p-4 gap-3 ">
            <UserDropdown showName={sidebar.open} />
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
