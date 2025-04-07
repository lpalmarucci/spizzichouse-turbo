"use client";

import { PropsWithChildren } from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export function Detail({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2 justify-center">{children}</div>;
}

interface DetailHeaderProps extends PropsWithChildren {
  href: string;
  editButtonText?: string;
  headingText: string;
  subHeadingText?: string;
}

export function DetailHeader({
  children,
  href,
  editButtonText = "Edit",
  headingText,
  subHeadingText,
}: DetailHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button variant="outline" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="w-full flex items-center justify-between px-2">
        <div className="grid gap-1 ">
          <h1 className="font-semibold text-3xl md:text-4xl">{headingText}</h1>
          {subHeadingText && (
            <p className="text-lg text-muted-foreground">{subHeadingText}</p>
          )}
        </div>
        <Button asChild>
          <Link href={href}>
            <Edit className="mr-2 h-4 w-4" />
            {editButtonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
