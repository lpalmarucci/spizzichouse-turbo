"use client";

import React, { PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
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
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        <DialogBody>
          <form className="w-full flex justify-end">
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
