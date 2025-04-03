"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { ChevronDown, LogOut } from "lucide-react";
import { LogoutConfirmDialog } from "@/features/auth/components/logout-confirm-dialog";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@workspace/ui/lib/utils";

interface UserDrodownProps {
  showName: boolean;
}

async function fetchUser() {
  const client = createClient();
  const { data } = await client.auth.getUser();
  return data.user;
}

export function UserDropdown({ showName }: UserDrodownProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>();
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    fetchUser();
  }, []);

  if (!user) return;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer p-5 flex items-center gap-2 px-2"
            size="lg"
          >
            <UserAvatar name={user?.user_metadata?.full_name} />
            {showName && (
              <>
                <span
                  className={cn(
                    "font-bold text-md tracking-tight transition text-nowrap inline-block animate-fade-in",
                  )}
                >
                  {user?.user_metadata?.full_name}
                </span>
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </>
  );
}
