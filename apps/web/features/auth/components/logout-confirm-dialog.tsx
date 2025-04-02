"use client";

import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { logout } from "@/features/auth/auth.actions";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/ui/components/dialog";
import { SubmitButton } from "@/components/submit-button";

type LogoutConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

export function LogoutConfirmDialog({
  open,
  onOpenChange,
  children,
}: LogoutConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sei sicuro di voler uscire?</DialogTitle>
          <DialogDescription>
            Dovrai effettuare nuovamente l'accesso per continuare.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form className="w-full flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <SubmitButton formAction={logout}>Confirm</SubmitButton>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
