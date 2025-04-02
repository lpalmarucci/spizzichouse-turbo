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
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

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
  const supabase = createClient();
  function handleConfirmLogout() {
    supabase.auth
      .signOut()
      .then(() => {
        toast("Logged out successfully.");
        setTimeout(() => {
          router.push("/");
        }, 500);
      })
      .catch(() => toast("error while trying to logout."));
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
