import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Separator } from '@workspace/ui/components/separator';
import { Switch } from '@workspace/ui/components/switch';
import { getInitials } from '@/features/player/utils';
import { PlayerLevel, PlayerStatus, type Player } from '@workspace/api/qgl-types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/ui/components/form';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@workspace/ui/components/button';
import React from 'react';
import { usePlayerEdit } from '../../hooks/usePlayerEdit';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const playerLevelOptions = Object.values(PlayerLevel);

interface PlayerEditFormProps {
  id: string;
  player: Player;
}

export function PlayerEditForm({ id, player }: PlayerEditFormProps) {
  const { form, isUpdating, handleStatusChange, handleSubmit } = usePlayerEdit(id, player);
  const router = useRouter();

  const handleFormSubmit = async () => {
    try {
      await handleSubmit();
      toast.success('Player updated successfully!');
      router.push(`/players/${id}`);
    } catch (e: any) {
      toast.error('An error occurred while updating the player');
    }
  };

  return (
    <Form {...form}>
      <form action={handleFormSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="w-full flex items-center justify-between">
                <div>
                  <CardTitle>Informazioni Personali</CardTitle>
                  <CardDescription>Modifica i dettagli di base del giocatore</CardDescription>
                </div>
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {getInitials(player?.full_name ?? '')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="full_name">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="full_name"
                          aria-label="Nome giocatore"
                          className="border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="bio">Biografia</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="bio"
                          aria-label="Biografia giocatore"
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
              <CardDescription>Aggiorna il livello e lo stato del giocatore</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="level">Livello</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger
                            id="level"
                            aria-label="Livello giocatore"
                            className="border-primary/20 focus:ring-primary/30 w-full"
                          >
                            <SelectValue placeholder="Seleziona un livello" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {playerLevelOptions.map((value) => (
                            <SelectItem value={value!} key={value} aria-label={value}>
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
                        <FormLabel htmlFor="status">Stato attivo</FormLabel>
                        <FormDescription>Determina se il giocatore è attualmente attivo</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          id="status"
                          aria-label="Stato attivo"
                          checked={field.value === PlayerStatus.Active}
                          onCheckedChange={handleStatusChange}
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
            <Button type="button" variant="outline" onClick={() => router.back()} aria-label="Annulla modifiche">
              Annulla
            </Button>
            <SubmitButton isLoading={isUpdating}>Salva modifiche</SubmitButton>
          </CardFooter>
        </div>
      </form>
    </Form>
  );
}
