"use client";

import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-row items-center justify-between gap-4 md:h-24">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left grow-1">
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
