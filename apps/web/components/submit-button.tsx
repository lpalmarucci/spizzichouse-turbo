"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@workspace/ui/components/button";
import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Loader } from "lucide-react";

type SubmitButtonProps = ComponentProps<"button"> & PropsWithChildren;

export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {pending && <Loader className="h-8 w-8 animate-spin" />}
      {children}
    </Button>
  );
}
