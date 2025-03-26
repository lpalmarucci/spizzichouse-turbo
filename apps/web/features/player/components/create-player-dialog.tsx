"use client";

import type React from "react";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { Button } from "@workspace/ui/components/button";

interface CreatePlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePlayerDialog({
  open,
  onOpenChange,
}: CreatePlayerDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [level, setLevel] = useState("Principiante");
  const [favoriteRuleSet, setFavoriteRuleSet] = useState("Standard");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui andrebbe la logica per creare un nuovo giocatore
    console.log({
      name,
      email,
      bio,
      level,
      favoriteRuleSet,
      status: isActive ? "active" : "inactive",
    });

    // Reset form
    setName("");
    setEmail("");
    setBio("");
    setLevel("Principiante");
    setFavoriteRuleSet("Standard");
    setIsActive(true);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crea Nuovo Giocatore</DialogTitle>
            <DialogDescription>
              Aggiungi un nuovo giocatore al tuo sistema di gestione partite
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Mario Rossi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-primary/20 focus-visible:ring-primary/30"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mario.rossi@esempio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-primary/20 focus-visible:ring-primary/30"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                placeholder="Breve descrizione del giocatore..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="level">Livello</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger
                    id="level"
                    className="border-primary/20 focus:ring-primary/30"
                  >
                    <SelectValue placeholder="Seleziona un livello" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzato">Avanzato</SelectItem>
                    <SelectItem value="Esperto">Esperto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="favoriteRuleSet">Set di Regole Preferito</Label>
                <Select
                  value={favoriteRuleSet}
                  onValueChange={setFavoriteRuleSet}
                >
                  <SelectTrigger
                    id="favoriteRuleSet"
                    className="border-primary/20 focus:ring-primary/30"
                  >
                    <SelectValue placeholder="Seleziona un set di regole" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Torneo Ufficiale">
                      Torneo Ufficiale
                    </SelectItem>
                    <SelectItem value="Modalità Estrema">
                      Modalità Estrema
                    </SelectItem>
                    <SelectItem value="Blitz">Blitz</SelectItem>
                    <SelectItem value="Principianti">Principianti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="active-status">Stato Attivo</Label>
                <p className="text-sm text-muted-foreground">
                  Il giocatore è attualmente attivo?
                </p>
              </div>
              <Switch
                id="active-status"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button type="submit">
              <UserPlus className="mr-2 h-4 w-4" />
              Crea Giocatore
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
