"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Pencil,
  Search,
  Star,
  Trash2,
  Trophy,
  UserPlus,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Input } from "@workspace/ui/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Progress } from "@workspace/ui/components/progress";
import { CreatePlayerDialog } from "@/components/players/create-player-dialog";
import { Badge } from "@workspace/ui/components/badge";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

// Dati mockati per i giocatori
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
    bio: "Giocatrice equilibrata che eccelle sia in difesa che in attacco. Ottima team players.",
    achievements: ["Miglior Giocatrice di Squadra", "Premio Versatilità"],
  },
];

type SortField =
  | "name"
  | "matches"
  | "wins"
  | "winRate"
  | "avgPosition"
  | "level"
  | "lastActive";
type SortDirection = "asc" | "desc";

export default function PlayersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("winRate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [playersList, setPlayersList] = useState(mockPlayers);

  const handleDeletePlayer = (id: string) => {
    setPlayersList(playersList.filter((player) => player.id !== id));
  };

  // Filtra i giocatori in base ai criteri
  const filteredPlayers = playersList.filter((player) => {
    // Filtra per ricerca
    if (
      searchQuery &&
      !player.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filtra per livello
    if (levelFilter !== "all" && player.level !== levelFilter) {
      return false;
    }

    // Filtra per stato
    if (statusFilter !== "all" && player.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  // Funzione per ottenere le iniziali del nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Funzione per ottenere il colore del livello
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Intermedio":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "Avanzato":
        return "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20";
      case "Esperto":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Funzione per ottenere il colore dello stato
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Funzione per ottenere il testo dello stato in italiano
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Attivo";
      case "inactive":
        return "Inattivo";
      default:
        return status;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex flex-row items-center gap-1">
              <Tooltip delayDuration={700}>
                <TooltipTrigger asChild>
                  <SidebarTrigger className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="bottom">Toggle drawer</TooltipContent>
              </Tooltip>
              <h1 className="text-3xl font-bold tracking-tight">Giocatori</h1>
            </div>
            <p className="text-muted-foreground">
              Gestisci e monitora i giocatori delle tue partite di carte
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="gap-1"
            >
              <UserPlus className="h-4 w-4" />
              Nuovo Giocatore
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cerca giocatori..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select defaultValue={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtra per livello" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i livelli</SelectItem>
                <SelectItem value="Principiante">Principiante</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Avanzato">Avanzato</SelectItem>
                <SelectItem value="Esperto">Esperto</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtra per stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="active">Attivo</SelectItem>
                <SelectItem value="inactive">Inattivo</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px]" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Partite giocate
                    </h4>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="matches-any" />
                        <Label htmlFor="matches-any">Qualsiasi numero</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="matches-10+" />
                        <Label htmlFor="matches-10+">10+ partite</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="matches-30+" />
                        <Label htmlFor="matches-30+">30+ partite</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="matches-50+" />
                        <Label htmlFor="matches-50+">50+ partite</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Percentuale vittorie
                    </h4>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="winrate-any" />
                        <Label htmlFor="winrate-any">Qualsiasi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="winrate-40+" />
                        <Label htmlFor="winrate-40+">40%+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="winrate-50+" />
                        <Label htmlFor="winrate-50+">50%+</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="winrate-60+" />
                        <Label htmlFor="winrate-60+">60%+</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLevelFilter("all");
                        setStatusFilter("all");
                      }}
                    >
                      Reset
                    </Button>
                    <Button size="sm">Applica</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("table")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-background border">
            <TabsTrigger value="all">Tutti i Giocatori</TabsTrigger>
            <TabsTrigger value="active">Attivi</TabsTrigger>
            <TabsTrigger value="inactive">Inattivi</TabsTrigger>
            <TabsTrigger value="top">Top Performers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PlayerCard player={player} onDelete={handleDeletePlayer} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedPlayers
                .filter((player) => player.status === "active")
                .map((player, index) => (
                  <div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PlayerCard player={player} onDelete={handleDeletePlayer} />
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedPlayers
                .filter((player) => player.status === "inactive")
                .map((player, index) => (
                  <div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PlayerCard player={player} onDelete={handleDeletePlayer} />
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="top" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedPlayers
                .sort((a, b) => b.winRate - a.winRate)
                .slice(0, 6)
                .map((player, index) => (
                  <div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PlayerCard player={player} onDelete={handleDeletePlayer} />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreatePlayerDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
}

function PlayerCard({
  player,
  onDelete,
}: {
  player: (typeof mockPlayers)[0];
  onDelete: (id: string) => void;
}) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Intermedio":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "Avanzato":
        return "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20";
      case "Esperto":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Attivo";
      case "inactive":
        return "Inattivo";
      default:
        return status;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(player.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{player.name}</CardTitle>
              <CardDescription>{player.email}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/players/${player.id}`}>Visualizza Dettagli</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/players/${player.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifica
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(player.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Elimina
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={getStatusColor(player.status)}>
            {getStatusText(player.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span>
                Vittorie: {player.wins}/{player.matches}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              <span>Win Rate: {player.winRate.toFixed(1)}%</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Win Rate</span>
              <span>{player.winRate.toFixed(1)}%</span>
            </div>
            <Progress value={player.winRate} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                Iscritto:{" "}
                {new Date(player.joinDate).toLocaleDateString("en-UK")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                Ultimo accesso:{" "}
                {new Date(player.lastActive).toLocaleDateString("en-UK")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/players/${player.id}`}>Visualizza Profilo</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
