"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { useGetMatchById } from "@/features/match/match.query";
import { ScreenLoader } from "@/components/screen-loader";
import { useForm } from "react-hook-form";
import {
  MATCH_FORM_INITIAL_VALUES,
  matchSchema,
  MatchSchemaType,
} from "@/features/match/match.schema";
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
import { MatchStatus } from "@workspace/db";

interface MatchEditFormProps {
  matchId: string;
}

export function MatchEditForm({ matchId }: MatchEditFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [status, setStatus] = useState("upcoming");
  const { data: match, isFetching } = useGetMatchById(matchId);
  const form = useForm<MatchSchemaType>({
    mode: "onChange",
    resolver: zodResolver(matchSchema),
    defaultValues: MATCH_FORM_INITIAL_VALUES,
  });

  function onFormSubmit() {
    const parseResult = matchSchema.safeParse(form.getValues());
    const errors = parseResult.error?.flatten().formErrors;
    if (!errors || errors.length === 0) {
      // mutate(form.getValues());
    }
  }

  useEffect(() => {
    console.log({ match });
    if (match)
      form.reset({
        ...match,
        date: new Date(match.date),
        playerIds: match.players?.map((p) => p.id),
      });
  }, [match]);
  if (isFetching) return <ScreenLoader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
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
                      <FormLabel>Estimated Duration</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
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
            <SubmitButton>Save changes</SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
