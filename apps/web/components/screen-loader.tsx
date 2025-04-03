"use client";

import { Loader2 } from "lucide-react";

export function ScreenLoader() {
  return (
    <div className="w-full h-full flex gap-2 justify-center items-center">
      Loading
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}
