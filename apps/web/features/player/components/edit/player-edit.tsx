"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPlayerById } from "@/features/player/player.query";
import { Player, PlayerLevel, PlayerStatus } from "@workspace/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";
import { getInitials } from "@/features/player/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@workspace/ui/zod-resolver";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { SubmitButton } from "@/components/submit-button";
import { updatePlayer } from "@/features/player/player.actions";
import { toast } from "sonner";
import { ApiResponse, isResponseError } from "@/lib/types";

interface PlayerEditProps {
  id: string;
}

const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().max(255),
  level: z.enum([
    PlayerLevel.BEGINNER,
    PlayerLevel.INTERMEDIATE,
    PlayerLevel.EXPERT,
  ]),
  status: z.enum([PlayerStatus.ACTIVE, PlayerStatus.INACTIVE]),
});

export function PlayerEdit({ id }: PlayerEditProps) {
  const router = useRouter();
  const { data } = useGetPlayerById(id);
  const [player, setPlayer] = useState<Player | undefined>(data);
  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      id,
      bio: player?.bio,
      name: player?.name,
      level: player?.level,
      status: player?.status,
    },
    mode: "onChange",
  });

  const [state, formAction] = useActionState(updatePlayer, {} as ApiResponse);

  useEffect(() => {
    if (!state) return;
    if (isResponseError(state)) {
      toast(state.error);
      return;
    }

    if (state.status) {
      toast("Player updated successfully!");
      router.push(`/players/${id}`);
      return;
    }
  }, [state]);

  if (!player) return;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Modifica Giocatore
          </h1>
          <p className="text-muted-foreground">
            Aggiorna le informazioni del profilo
          </p>
        </div>
      </div>

      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="w-full flex items-center justify-between">
                  <div>
                    <CardTitle>Informazioni Personali</CardTitle>
                    <CardDescription>
                      Modifica i dettagli di base del giocatore
                    </CardDescription>
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {getInitials(player.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-primary/20 focus-visible:ring-primary/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2 cursor-not-allowed">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={player.email}
                    disabled
                    onChange={(e) =>
                      setPlayer({ ...player, email: e.target.value })
                    }
                    className="border-primary/20 focus-visible:ring-primary/30"
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biografia</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
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
                <CardTitle>Livello e Stato</CardTitle>
                <CardDescription>
                  Aggiorna il livello e lo stato del giocatore
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Livello</FormLabel>
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
                            {Object.values(PlayerLevel).map((value) => (
                              <SelectItem value={value!} key={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="w-full flex items-center justify-between">
                        <div>
                          <FormLabel>Stato attivo</FormLabel>
                          <FormDescription>
                            Determina se il giocatore è attualmente attivo
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === PlayerStatus.ACTIVE}
                            onCheckedChange={(val) =>
                              field.onChange(
                                val
                                  ? PlayerStatus.ACTIVE
                                  : PlayerStatus.INACTIVE,
                              )
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <CardFooter className="flex justify-end gap-2 px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Annulla
              </Button>
              <SubmitButton>Salva modifiche</SubmitButton>
            </CardFooter>
          </div>
        </form>
      </Form>
    </div>
  );
}
