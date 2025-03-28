"use client";

import React, { PropsWithChildren, use } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { AuthContext } from "@/providers/auth";
import { redirect, useRouter } from "next/navigation";

type LogoutConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

export function LogoutConfirmDialog({
  open,
  onOpenChange,
  children,
}: LogoutConfirmDialogProps) {
  const auth = use(AuthContext);
  const router = useRouter();
  function handleConfirmLogout() {
    fetch("/api/logout", {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    }).then((res) => {
      redirect("/");
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sei sicuro di voler uscire?</DialogTitle>
          <DialogDescription>
            Dovrai effettuare nuovamente l'accesso per continuare.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirmLogout()}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
