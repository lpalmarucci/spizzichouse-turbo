import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { getInitials } from "@/features/player/utils";
import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface UserAvatarProps {
  name?: string;
  className?: string;
}

export default function UserAvatar({ name, className }: UserAvatarProps) {
  if (!name) return;
  return (
    <Avatar className={cn("border-2 border-primary/20", className)}>
      <AvatarFallback className="text-sm bg-primary text-primary-foreground">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
