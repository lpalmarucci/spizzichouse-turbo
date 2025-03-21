"use client";

import { Github, Trophy } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Spizzichouse</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 Spizzichouse. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/lpalmarucci/spizzichouse-turbo"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Github />
          </Link>
        </div>
      </div>
    </footer>
  );
}
