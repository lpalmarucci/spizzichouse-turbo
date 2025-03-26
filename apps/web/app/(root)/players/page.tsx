// Dati mockati per i giocatori

import { PlayerSection } from "@/features/player/components/player-section";
import { PLAYER_QUERY_KEY } from "@/features/player/player.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPlayers } from "@/features/player/player.actions";

const mockPlayers = [
  {
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
    bio: "Appassionato di giochi di carte da oltre 10 anni. Specializzato in strategie difensive.",
    achievements: [
      "Campione Regionale 2024",
      "Vincitore Torneo Estivo",
      "MVP del mese",
    ],
  },
  {
    id: "2",
    name: "Martina Rossi",
    email: "martina.rossi@example.com",
    joinDate: "2024-02-10",
    matches: 38,
    wins: 22,
    winRate: 57.9,
    avgPosition: 2.1,
    favoriteRuleSet: "Torneo Ufficiale",
    level: "Avanzato",
    status: "active",
    lastActive: "2025-03-21",
    avatar: null,
    bio: "Giocatrice competitiva con background in giochi di strategia. Preferisce tattiche aggressive.",
    achievements: ["Finalista Campionato Nazionale", "Miglior Esordiente 2024"],
  },
  {
    id: "3",
    name: "Luca Verdi",
    email: "luca.verdi@example.com",
    joinDate: "2024-01-05",
    matches: 35,
    wins: 18,
    winRate: 51.4,
    avgPosition: 2.4,
    favoriteRuleSet: "Casual",
    level: "Intermedio",
    status: "active",
    lastActive: "2025-03-19",
    avatar: null,
    bio: "Giocatore versatile che si adatta facilmente a diversi stili di gioco e formati.",
    achievements: ["Vincitore Torneo Primaverile"],
  },
  {
    id: "4",
    name: "Giulia Neri",
    email: "giulia.neri@example.com",
    joinDate: "2024-03-01",
    matches: 20,
    wins: 12,
    winRate: 60.0,
    avgPosition: 2.2,
    favoriteRuleSet: "Blitz",
    level: "Avanzato",
    status: "active",
    lastActive: "2025-03-22",
    avatar: null,
    bio: "Specialista in partite veloci. Eccelle nelle decisioni rapide sotto pressione.",
    achievements: ["Regina del Blitz 2024", "Miglior Strategia Offensiva"],
  },
  {
    id: "5",
    name: "Marco Gialli",
    email: "marco.gialli@example.com",
    joinDate: "2024-02-20",
    matches: 30,
    wins: 15,
    winRate: 50.0,
    avgPosition: 2.5,
    favoriteRuleSet: "Standard",
    level: "Intermedio",
    status: "inactive",
    lastActive: "2025-03-10",
    avatar: null,
    bio: "Giocatore metodico che preferisce partite lunghe dove può sviluppare strategie complesse.",
    achievements: ["Miglior Comeback", "Stratega dell'Anno"],
  },
  {
    id: "6",
    name: "Sofia Blu",
    email: "sofia.blu@example.com",
    joinDate: "2024-01-25",
    matches: 25,
    wins: 8,
    winRate: 32.0,
    avgPosition: 3.8,
    favoriteRuleSet: "Principianti",
    level: "Principiante",
    status: "active",
    lastActive: "2025-03-18",
    avatar: null,
    bio: "Nuova nel mondo dei giochi di carte, ma impara velocemente. Entusiasta e competitiva.",
    achievements: ["Miglior Principiante 2024"],
  },
  {
    id: "7",
    name: "Roberto Viola",
    email: "roberto.viola@example.com",
    joinDate: "2023-12-15",
    matches: 50,
    wins: 30,
    winRate: 60.0,
    avgPosition: 2.0,
    favoriteRuleSet: "Torneo Ufficiale",
    level: "Esperto",
    status: "active",
    lastActive: "2025-03-21",
    avatar: null,
    bio: "Veterano dei tornei con esperienza internazionale. Mentore per nuovi giocatori.",
    achievements: [
      "Campione Nazionale 2023",
      "Miglior Giocatore Veterano",
      "Premio Fair Play",
    ],
  },
  {
    id: "8",
    name: "Elena Arancio",
    email: "elena.arancio@example.com",
    joinDate: "2024-03-10",
    matches: 15,
    wins: 3,
    winRate: 20.0,
    avgPosition: 4.5,
    favoriteRuleSet: "Principianti",
    level: "Principiante",
    status: "active",
    lastActive: "2025-03-20",
    avatar: null,
    bio: "Nuova nel circuito competitivo. Appassionata di giochi di carte collezionabili.",
    achievements: [],
  },
  {
    id: "9",
    name: "Davide Rosa",
    email: "davide.rosa@example.com",
    joinDate: "2023-11-20",
    matches: 60,
    wins: 35,
    winRate: 58.3,
    avgPosition: 2.2,
    favoriteRuleSet: "Modalità Estrema",
    level: "Esperto",
    status: "inactive",
    lastActive: "2025-03-01",
    avatar: null,
    bio: "Innovatore di strategie non convenzionali. Preferisce regole complesse e sfidanti.",
    achievements: [
      "Innovatore dell'Anno",
      "Vincitore Torneo Invernale",
      "Stratega Elite",
    ],
  },
  {
    id: "10",
    name: "Chiara Azzurri",
    email: "chiara.azzurri@example.com",
    joinDate: "2024-02-05",
    matches: 28,
    wins: 14,
    winRate: 50.0,
    avgPosition: 2.6,
    favoriteRuleSet: "Standard",
    level: "Intermedio",
    status: "active",
    lastActive: "2025-03-19",
    avatar: null,
    bio: "Giocatrice analitica con background in matematica. Eccelle nell'analisi probabilistica.",
    achievements: ["Premio Miglior Analisi", "Finalista Torneo Primaverile"],
  },
  {
    id: "11",
    name: "Paolo Marrone",
    email: "paolo.marrone@example.com",
    joinDate: "2023-10-10",
    matches: 70,
    wins: 45,
    winRate: 64.3,
    avgPosition: 1.9,
    favoriteRuleSet: "Torneo Ufficiale",
    level: "Esperto",
    status: "active",
    lastActive: "2025-03-22",
    avatar: null,
    bio: "Giocatore di fama internazionale. Ha partecipato a tornei in tutta Europa.",
    achievements: [
      "Campione Europeo 2023",
      "Vincitore Grand Slam",
      "Leggenda del Circuito",
    ],
  },
  {
    id: "12",
    name: "Laura Grigio",
    email: "laura.grigio@example.com",
    joinDate: "2024-01-30",
    matches: 32,
    wins: 16,
    winRate: 50.0,
    avgPosition: 2.5,
    favoriteRuleSet: "Casual",
    level: "Intermedio",
    status: "active",
    lastActive: "2025-03-20",
    avatar: null,
    bio: "Giocatrice equilibrata che eccelle sia in difesa che in attacco. Ottima team player.",
    achievements: ["Miglior Giocatrice di Squadra", "Premio Versatilità"],
  },
];

export default async function PlayersPage() {
  // const items = await useFetchAuth("/players", ["players"]);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: getPlayers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex flex-row items-center gap-1">
              {/*<Tooltip delayDuration={700}>*/}
              {/*  <TooltipTrigger asChild>*/}
              {/*    <SidebarTrigger className="cursor-pointer" />*/}
              {/*  </TooltipTrigger>*/}
              {/*  <TooltipContent side="bottom">Toggle drawer</TooltipContent>*/}
              {/*</Tooltip>*/}
              <h1 className="text-3xl font-bold tracking-tight">Giocatori</h1>
            </div>
            <p className="text-muted-foreground">
              Gestisci e monitora i giocatori delle tue partite di carte
            </p>
          </div>
        </div>

        <PlayerSection />
      </div>
    </HydrationBoundary>
  );
}
