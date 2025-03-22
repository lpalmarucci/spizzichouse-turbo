"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScrollText,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
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
    <nav className="grid items-start gap-2 p-4 border-r h-full">
      <div className="flex h-full w-full flex-col">
        <Link href="/" className="flex items-center gap-2 py-4">
          <span className="text-xl font-bold">Card Game Manager</span>
        </Link>
        <div className="grid gap-1 px-2 group py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                pathname === route.href && "bg-primary text-primary-foreground",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {route.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
