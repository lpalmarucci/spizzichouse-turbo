import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { DateTimePicker } from '@/components/date-time-picker';
import { Textarea } from '@workspace/ui/components/textarea';
import { SelectAvailablePlayers } from '@/features/match/components/select-available-players';
import { Button } from '@workspace/ui/components/button';
import { SubmitButton } from '@/components/submit-button';
import React from 'react';
import { useCreateMatchDialog } from '../hooks/useCreateMatchDialog';
import { toast } from 'sonner';
import { DialogClose, DialogFooter } from '@workspace/ui/components/dialog';
import { useQueryClient } from '@tanstack/react-query';
import { MATCH_QUERY_KEY } from '../match.query';

interface CreateMatchFormProps {
  onClose: (shouldRefresh?: boolean) => void;
}

export function CreateMatchForm({ onClose }: CreateMatchFormProps) {
  const { form, isCreatingMatch, handleSubmit } = useCreateMatchDialog();

  const handleFormSubmit = async () => {
    try {
      await handleSubmit();
      toast.success('Match created successfully');
      onClose(true);
    } catch (error) {
      toast.error('Failed to create match');
    }
  };

  return (
    <Form {...form}>
      <form action={handleFormSubmit}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Weekend Tournament"
                    className="border-primary/20 focus-visible:ring-primary/30"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} date={field.value} setDate={(date) => field.onChange(date)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Duration</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Minutes" />
                        </SelectTrigger>
                        <SelectContent className="w-full border-primary/20 focus-visible:ring-primary/30">
                          {[0, 15, 30, 45, 60].map((min) => (
                            <SelectItem key={min} value={min.toString()}>
                              {min} minutes
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value?.toString()}
                    placeholder="Details about the match..."
                    className="border-primary/20 focus-visible:ring-primary/30"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="playerIds"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SelectAvailablePlayers field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton disabled={!form.formState.isValid || isCreatingMatch}>Create Match</SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  );
}
