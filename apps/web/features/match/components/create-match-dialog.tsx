"use client";

import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@workspace/ui/zod-resolver";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { DateTimePicker } from "@/components/date-time-picker";
import { Textarea } from "@workspace/ui/components/textarea";
import { SelectAvailablePlayers } from "@/features/match/components/select-available-players";
import { SubmitButton } from "@/components/submit-button";
import { createMatchAction } from "@/features/match/match.actions";
import {
  MATCH_FORM_INITIAL_VALUES,
  matchSchema,
  type MatchSchemaType,
} from "@/features/match/match.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateMatchDialog({ open, onOpenChange }: CreateMatchDialogProps) {
  const form = useForm<MatchSchemaType>({
    mode: "onChange",
    resolver: zodResolver(matchSchema),
    defaultValues: MATCH_FORM_INITIAL_VALUES,
  });
  const router = useRouter();

  const [_, startTransition] = useTransition();

  async function onFormAction(formData: FormData) {
    startTransition(async () => {
      const { error, data } = await createMatchAction(form.getValues());

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.info("Match created successfully");
      form.reset();
      onOpenChange(false);
      router.push(`/matches/${data?.createMatch.id}`);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          form.reset(MATCH_FORM_INITIAL_VALUES);
        }
        onOpenChange(val);
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Match</DialogTitle>
          <DialogDescription>
            Set up a new card game match with custom rules and players.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={onFormAction}>
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
                        <DateTimePicker
                          {...field}
                          date={field.value}
                          setDate={(date) => field.onChange(date)}
                        />
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
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
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

            <div className="w-full flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <SubmitButton disabled={!form.formState.isValid}>
                Create Match
              </SubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateMatchDialog;
