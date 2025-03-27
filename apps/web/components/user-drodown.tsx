"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import React, { use } from "react";
import { AuthContext } from "@/providers/auth";

export function UserDropdown() {
  const userInfo = use(AuthContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
            {/*{getInitials(player.name)}*/}
            AB
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
