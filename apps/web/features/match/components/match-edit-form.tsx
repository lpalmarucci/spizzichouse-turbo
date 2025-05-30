"use client";

import React, { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { DateTimePicker } from "@/components/date-time-picker";
import { useGetMatch } from "@/features/match/match.hook";
import { useForm } from "react-hook-form";
import { matchSchema, MatchSchemaType } from "@/features/match/match.schema";
import { zodResolver } from "@workspace/ui/zod-resolver";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { SubmitButton } from "@/components/submit-button";
import { SelectAvailablePlayers } from "@/features/match/components/select-available-players";
import { MatchStatus } from "@workspace/api/qgl-types";
import { toast } from "sonner";
import { updateMatchAction } from "@/features/match/match.actions";
import { ScreenLoader } from "@/components/screen-loader";

interface MatchEditFormProps {
  id: string;
}

export function MatchEditForm({ id }: MatchEditFormProps) {
  const { data, isLoading, error } = useGetMatch(id);

  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect("/matches");
    }, 500);
    return;
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!data) {
    toast.warning("No match found!");
    setTimeout(() => {
      redirect("/matches");
    }, 500);
    return;
  }

  const { match } = data;
  const router = useRouter();

  const form = useForm<MatchSchemaType>({
    mode: "onChange",
    resolver: zodResolver(matchSchema),
    defaultValues: {
      title: match?.title ?? "",
      description: match?.description,
      duration: match?.duration,
      date: match?.date ? new Date(match?.date) : new Date(),
      status: match?.status,
      playerIds: match?.players?.map((p) => p.id) ?? [],
    },
  });

  const [isPending, startTransition] = useTransition();

  async function onFormAction() {
    startTransition(async () => {
      const { error } = await updateMatchAction(id, form.getValues());

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.info("Match updated successfully");
      router.push(`/matches/${id}`);
    });
  }

  return (
    <Form {...form}>
      <form action={onFormAction}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Details</CardTitle>
              <CardDescription>
                Update the basic information for your card game match.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          setDate={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="level"
                            className="border-primary/20 focus:ring-primary/30 w-full"
                          >
                            <SelectValue placeholder="Seleziona un livello" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(MatchStatus).map(
                            (value: MatchStatus) => (
                              <SelectItem value={value!} key={value}>
                                {value}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durata</FormLabel>
                      <Select
                        {...field}
                        defaultValue={field.value?.toString()}
                        onValueChange={(v) => field.onChange(Number(v))}
                        value={field.value?.toString() ?? "0"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Minutes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full border-primary/20 focus-visible:ring-primary/30">
                          {[0, 15, 30, 45, 60].map((min) => (
                            <SelectItem key={min} value={min.toString()}>
                              {min} minutes
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Players</CardTitle>
              <CardDescription>
                Update the players who will participate in this match.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <SubmitButton disabled={isPending || !form.formState.isValid}>
              Save changes
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
