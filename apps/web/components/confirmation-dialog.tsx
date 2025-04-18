"use client";

import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/ui/components/dialog";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@workspace/ui/components/button";

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  onConfirm: () => void;
} & PropsWithChildren;

export function ConfirmationDialog({
  open,
  onOpenChange,
  title = "Sei sicuro di voler procedere?",
  subtitle = "L'azione è irreversibile",
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form
            action={async () => {
              onConfirm?.();
            }}
            className="w-full flex justify-end gap-2"
          >
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton>Confirm</SubmitButton>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
