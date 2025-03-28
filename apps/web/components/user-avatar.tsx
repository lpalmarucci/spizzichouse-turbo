"use client";

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { getInitials } from "@/features/player/utils";
import React from "react";

interface UserAvatarProps {
  name?: string;
}

export default function UserAvatar({ name }: UserAvatarProps) {
  if (!name) return;
  return (
    <Avatar className=" border-2 border-primary/20">
      <AvatarFallback className="text-sm bg-primary text-primary-foreground">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
