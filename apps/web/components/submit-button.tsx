"use client";

import { Button } from "@workspace/ui/components/button";
import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  isLoading?: boolean;
} & ComponentProps<"button"> &
  PropsWithChildren;

export function SubmitButton({
  children,
  isLoading,
  className,
  variant,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {(isLoading || pending) && <Loader className="h-8 w-8 animate-spin" />}
      {children}
    </Button>
  );
}
