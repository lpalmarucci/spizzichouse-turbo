"use client";

import { Button } from "@workspace/ui/components/button";
import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Loader } from "lucide-react";

type SubmitButtonProps = {
  isLoading: boolean;
} & ComponentProps<"button"> &
  PropsWithChildren;

export function SubmitButton({
  children,
  isLoading,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {isLoading && <Loader className="h-8 w-8 animate-spin" />}
      {children}
    </Button>
  );
}
