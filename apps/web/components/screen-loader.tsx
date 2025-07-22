import { Loader2 } from 'lucide-react';
import type React from 'react';

export function ScreenLoader() {
  return (
    <div className="flex items-center justify-center h-64 flex-col gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <h1 className="text-muted-foreground font-semibold tracking-tight">Loading...</h1>
    </div>
  );
}
