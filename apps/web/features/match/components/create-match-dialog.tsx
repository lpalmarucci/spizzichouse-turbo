'use client';

import React, { useTransition } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@workspace/ui/zod-resolver';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { DateTimePicker } from '@/components/date-time-picker';
import { Textarea } from '@workspace/ui/components/textarea';
import { SelectAvailablePlayers } from '@/features/match/components/select-available-players';
import { SubmitButton } from '@/components/submit-button';
import { createMatchAction } from '@/features/match/match.actions';
import { MATCH_FORM_INITIAL_VALUES, matchSchema, type MatchSchemaType } from '@/features/match/match.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCreateMatchDialog } from '../hooks/useCreateMatchDialog';
import { CreateMatchForm } from './CreateMatchForm';

interface CreateMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean, shouldRefresh?: boolean) => void;
}

function CreateMatchDialog({ open, onOpenChange }: CreateMatchDialogProps) {
  const { resetFormFields } = useCreateMatchDialog();
  const handleDialogClose = (val: boolean) => {
    if (!val) resetFormFields();
    onOpenChange(val);
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Match</DialogTitle>
          <DialogDescription>Set up a new card game match with custom rules and players.</DialogDescription>
        </DialogHeader>
        <CreateMatchForm onClose={(shouldRefresh) => onOpenChange(false, shouldRefresh)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateMatchDialog;
