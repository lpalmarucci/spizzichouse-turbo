"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import React, { use, useState } from "react";
import { AuthContext } from "@/providers/auth";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronDown, LogOut } from "lucide-react";
import { LogoutConfirmDialog } from "@/features/auth/components/logout-confirm-dialog";

interface UserDrodownProps {
  showName: boolean;
}

export function UserDropdown({ showName }: UserDrodownProps) {
  const context = use(AuthContext);
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

  if (!context?.userInfo) return null;

  console.log({ context });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer p-5 flex items-center gap-2 px-2"
            size="lg"
          >
            <UserAvatar name={context.userInfo?.name} />
            {showName && (
              <>
                <span
                  className={cn(
                    "font-bold text-md tracking-tight transition text-nowrap inline-block animate-fade-in",
                  )}
                >
                  {context.userInfo.name}
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
