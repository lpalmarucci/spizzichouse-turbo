"use client";

import { Loader2 } from "lucide-react";
import type React from "react";

export function ScreenLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
