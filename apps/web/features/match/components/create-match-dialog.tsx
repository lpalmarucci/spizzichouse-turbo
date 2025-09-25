'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { useCreateMatchDialog } from '../hooks/useCreateMatchDialog';
import { CreateMatchForm } from './CreateMatchForm';
import { Match } from '@workspace/api/qgl-types';

interface CreateMatchDialogProps {
  open: boolean;
  onClose: (shouldRefresh: boolean) => void;
  onSubmit: (match: Match) => void;
}

function CreateMatchDialog({ open, onClose, onSubmit }: CreateMatchDialogProps) {
  const { resetFormFields } = useCreateMatchDialog();
  const handleDialogClose = (val: boolean) => {
    if (!val) resetFormFields();
    onClose(val);
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Match</DialogTitle>
          <DialogDescription>Set up a new card game match with custom rules and players.</DialogDescription>
        </DialogHeader>
        <CreateMatchForm onSubmit={onSubmit} onClose={() => onClose(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateMatchDialog;
