"use client";

import { useState } from "react";
import {
  Calendar,
  Grid3X3,
  List,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Calendar as CalendarComponent } from "@workspace/ui/components/calendar";
import { Badge } from "@workspace/ui/components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { MatchCard } from "@/features/matches/components/match-card";

// Mock data for matches
const mockMatches = [
  {
    id: "1",
    title: "Weekend Tournament",
    status: "upcoming",
    date: "2025-04-15T14:00:00",
    location: "Game Center",
    players: [
      { id: "1", name: "Alex Smith" },
      { id: "2", name: "Jamie Johnson" },
      { id: "3", name: "Taylor Brown" },
      { id: "4", name: "Jordan Lee" },
      { id: "5", name: "Casey Wilson" },
      { id: "6", name: "Morgan Davis" },
      { id: "7", name: "Riley Garcia" },
      { id: "8", name: "Quinn Martinez" },
    ],
    ruleSet: "Standard",
    duration: 120,
  },
  {
    id: "2",
    title: "Casual Friday Match",
    status: "in-progress",
    date: "2025-04-07T19:30:00",
    location: "Coffee Shop",
    players: [
      { id: "1", name: "Alex Smith" },
      { id: "2", name: "Jamie Johnson" },
      { id: "3", name: "Taylor Brown" },
      { id: "4", name: "Jordan Lee" },
    ],
    ruleSet: "Casual",
    duration: 90,
  },
  {
    id: "3",
    title: "Championship Finals",
    status: "completed",
    date: "2025-04-01T10:00:00",
    location: "Convention Center",
    players: [
      { id: "1", name: "Alex Smith" },
      { id: "2", name: "Jamie Johnson" },
      { id: "3", name: "Taylor Brown" },
      { id: "4", name: "Jordan Lee" },
      { id: "5", name: "Casey Wilson" },
      { id: "6", name: "Morgan Davis" },
      { id: "7", name: "Riley Garcia" },
      { id: "8", name: "Quinn Martinez" },
      { id: "9", name: "Sam Wilson" },
      { id: "10", name: "Jesse Taylor" },
      { id: "11", name: "Avery Thomas" },
      { id: "12", name: "Blake Anderson" },
      { id: "13", name: "Cameron White" },
      { id: "14", name: "Drew Martin" },
      { id: "15", name: "Emerson Clark" },
      { id: "16", name: "Finley Rodriguez" },
    ],
    ruleSet: "Tournament",
    duration: 240,
  },
  {
    id: "4",
    title: "Beginner's Workshop",
    status: "upcoming",
    date: "2025-04-20T15:00:00",
    location: "Community Center",
    players: [
      { id: "5", name: "Casey Wilson" },
      { id: "6", name: "Morgan Davis" },
      { id: "7", name: "Riley Garcia" },
      { id: "8", name: "Quinn Martinez" },
      { id: "9", name: "Sam Wilson" },
      { id: "10", name: "Jesse Taylor" },
    ],
    ruleSet: "Beginner",
    duration: 180,
  },
  {
    id: "5",
    title: "Professional Showdown",
    status: "completed",
    date: "2025-03-28T18:00:00",
    location: "Card Shop",
    players: [
      { id: "1", name: "Alex Smith" },
      { id: "2", name: "Jamie Johnson" },
    ],
    ruleSet: "Professional",
    duration: 150,
  },
  {
    id: "6",
    title: "Monthly Tournament",
    status: "in-progress",
    date: "2025-04-05T13:00:00",
    location: "Game Center",
    players: [
      { id: "3", name: "Taylor Brown" },
      { id: "4", name: "Jordan Lee" },
      { id: "5", name: "Casey Wilson" },
      { id: "6", name: "Morgan Davis" },
      { id: "7", name: "Riley Garcia" },
      { id: "8", name: "Quinn Martinez" },
      { id: "9", name: "Sam Wilson" },
      { id: "10", name: "Jesse Taylor" },
    ],
    ruleSet: "Standard",
    duration: 210,
  },
  {
    id: "7",
    title: "Bracket Challenge",
    status: "upcoming",
    date: "2025-04-25T11:00:00",
    location: "Convention Center",
    players: [
      { id: "1", name: "Alex Smith" },
      { id: "3", name: "Taylor Brown" },
      { id: "5", name: "Casey Wilson" },
      { id: "7", name: "Riley Garcia" },
      { id: "9", name: "Sam Wilson" },
      { id: "11", name: "Avery Thomas" },
      { id: "13", name: "Cameron White" },
      { id: "15", name: "Emerson Clark" },
    ],
    ruleSet: "Tournament",
    duration: 240,
  },
  {
    id: "8",
    title: "Strategy Session",
    status: "completed",
    date: "2025-03-22T15:30:00",
    location: "Card Shop",
    players: [
      { id: "2", name: "Jamie Johnson" },
      { id: "4", name: "Jordan Lee" },
      { id: "6", name: "Morgan Davis" },
      { id: "8", name: "Quinn Martinez" },
    ],
    ruleSet: "Casual",
    duration: 120,
  },
];

type SortField =
  | "title"
  | "date"
  | "players"
  | "ruleSet"
  | "location"
  | "duration"
  | "status";
type SortDirection = "asc" | "desc";

export function MatchesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ruleSetFilter, setRuleSetFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [matchesList, setMatchesList] = useState(mockMatches);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Handle delete match
  const handleDeleteMatch = (id: string) => {
    setMatchesList(matchesList.filter((match) => match.id !== id));
  };

  // Filter matches based on criteria
  const filteredMatches = matchesList.filter((match) => {
    // Filter by search query
    if (
      searchQuery &&
      !match.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter !== "all" && match.status !== statusFilter) {
      return false;
    }

    // Filter by rule set
    if (ruleSetFilter !== "all" && match.ruleSet !== ruleSetFilter) {
      return false;
    }

    // Filter by location
    if (locationFilter !== "all" && match.location !== locationFilter) {
      return false;
    }

    // Filter by date
    if (date) {
      const matchDate = new Date(match.date);
      return (
        matchDate.getDate() === date.getDate() &&
        matchDate.getMonth() === date.getMonth() &&
        matchDate.getFullYear() === date.getFullYear()
      );
    }

    return true;
  });

  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (sortField === "players") {
      return sortDirection === "asc"
        ? a.players.length - b.players.length
        : b.players.length - a.players.length;
    }

    if (sortField === "duration") {
      return sortDirection === "asc"
        ? a.duration - b.duration
        : b.duration - a.duration;
    }

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // Helper functions
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "in-progress":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "completed":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get unique rule sets
  const uniqueRuleSets = Array.from(
    new Set(matchesList.map((match) => match.ruleSet)),
  );

  // Get unique locations
  const uniqueLocations = Array.from(
    new Set(matchesList.map((match) => match.location)),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">
            View and manage all your card game matches
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Match
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs
            defaultValue={statusFilter}
            onValueChange={setStatusFilter}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-background border">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="in-progress">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search matches..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                  {filtersApplied && (
                    <Badge
                      variant="secondary"
                      className="ml-1 rounded-sm px-1 font-normal"
                    >
                      {ruleSetFilter !== "all" || locationFilter !== "all"
                        ? (ruleSetFilter !== "all" ? 1 : 0) +
                          (locationFilter !== "all" ? 1 : 0)
                        : 0}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px]" align="end">
                <div className="grid gap-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setRuleSetFilter("all");
                        setLocationFilter("all");
                        setFiltersApplied(false);
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setFiltersApplied(
                          ruleSetFilter !== "all" || locationFilter !== "all",
                        );
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="players">Most Players</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {date && (
          <div className="flex items-center">
            <Badge variant="outline" className="gap-1 text-sm font-normal">
              <Calendar className="h-3 w-3" />
              Date: {date.toLocaleDateString()}
              <button
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => setDate(undefined)}
              >
                <span className="sr-only">Remove date filter</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </Badge>
          </div>
        )}

        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedMatches.map((match, index) => (
              <div key={match.id}>
                <MatchCard match={match} onDelete={handleDeleteMatch} />
              </div>
            ))}
          </div>

          {sortedMatches.length === 0 && (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No matches found</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                {date
                  ? "No matches on this date. Try selecting a different date or clearing your filters."
                  : "No matches match your filters. Try changing your search criteria."}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setRuleSetFilter("all");
                  setLocationFilter("all");
                  setDate(undefined);
                  setFiltersApplied(false);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
