"use client";

import { useRef, useState } from "react";
import { Calendar, Plus, Search } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Input } from "@workspace/ui/components/input";
import { Badge } from "@workspace/ui/components/badge";
import { MatchCard } from "@/features/match/components/match-card";
import CreateMatchDialog from "@/features/match/components/create-match-dialog";
import {
  MATCH_QUERY_KEY,
  useDeleteMatch,
  useGetMatches,
} from "@/features/match/match.query";
import { ScreenLoader } from "@/components/screen-loader";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Calendar as CalendarComponent } from "@workspace/ui/components/calendar";
import { MatchStatus } from "@workspace/db";

export function MatchesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { data: matches = [], isFetching } = useGetMatches();
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const matchId = useRef<string | null>(null);

  const { mutate: deleteMatchMutation } = useDeleteMatch(() => {
    toast.info(`Match deleted successfully`);
    setShowDeleteDialog(false);
    queryClient.invalidateQueries({ queryKey: [MATCH_QUERY_KEY] });
  });

  if (isFetching) {
    return <ScreenLoader />;
  }

  // Handle delete match
  const handleDeleteMatch = (id: string) => {
    setShowDeleteDialog(true);
    matchId.current = id;
  };

  // Filter match based on criteria
  const filteredMatches = matches.filter((match) => {
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
          <Button className="gap-1" onClick={() => setShowCreateDialog(true)}>
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
              <TabsTrigger value={MatchStatus.UPCOMING}>Upcoming</TabsTrigger>
              <TabsTrigger value={MatchStatus.IN_PROGRESS}>Active</TabsTrigger>
              <TabsTrigger value={MatchStatus.COMPLETED}>Completed</TabsTrigger>
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
          </div>
        </div>

        {date && (
          <div className="flex items-center">
            <Badge variant="outline" className="gap-1 text-sm font-normal">
              <Calendar className="h-3 w-3" />
              Date: {date.toLocaleDateString("en-UK")}
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
            {filteredMatches.map((match, index) => (
              <div key={match.id}>
                <MatchCard match={match} onDelete={handleDeleteMatch} />
              </div>
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No matches found</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                {date
                  ? "No match on this date. Try selecting a different date or clearing your filters."
                  : "No match match your filters. Try changing your search criteria."}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDate(undefined);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <CreateMatchDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          deleteMatchMutation(matchId.current as string);
        }}
      />
    </div>
  );
}
