"use client";

import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
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
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPlayerById } from "@/features/player/player.query";
import { Player } from "@workspace/db";

interface PlayerEditProps {
  id: string;
}

// Dati mockati per il giocatore
const playerData = {
  id: "1",
  name: "Alessandro Bianchi",
  email: "alessandro.bianchi@example.com",
  joinDate: "2024-01-15",
  matches: 42,
  wins: 28,
  winRate: 66.7,
  avgPosition: 1.8,
  favoriteRuleSet: "Standard",
  level: "Esperto",
  status: "active",
  lastActive: "2025-03-20",
  avatar: null,
  bio: "Appassionato di giochi di carte da oltre 10 anni. Specializzato in strategie difensive e gioco tattico. Ha partecipato a numerosi tornei nazionali e internazionali, ottenendo ottimi risultati. Sempre alla ricerca di nuove sfide e avversari competitivi.",
  achievements: [
    "Campione Regionale 2024",
    "Vincitore Torneo Estivo",
    "MVP del mese",
    "Miglior Stratega 2023",
    "Finalista Campionato Nazionale",
  ],
};

export function PlayerEdit({ id }: PlayerEditProps) {
  const router = useRouter();
  const { data } = useGetPlayerById(id);
  const [player, setPlayer] = useState<Player | undefined>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui andrebbe la logica per salvare le modifiche
    console.log("Player updated:", { player });
    router.push(`/players/${id}`);
  };

  // Funzione per ottenere le iniziali del nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/players/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
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

      <form onSubmit={handleSubmit}>
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
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={player.name}
                  onChange={(e) =>
                    setPlayer({ ...player, name: e.target.value })
                  }
                  className="border-primary/20 focus-visible:ring-primary/30"
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
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={player.bio}
                  onChange={(e) =>
                    setPlayer({ ...player, bio: e.target.value })
                  }
                  className="min-h-[100px] border-primary/20 focus-visible:ring-primary/30"
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
            <Button type="submit">Salva Modifiche</Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
}
