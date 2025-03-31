"use client";

import { Loader2 } from "lucide-react";

export function ScreenLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className="h-18 w-18 animate-spin" />
    </div>
  );
}
