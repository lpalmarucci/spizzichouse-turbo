"use client";

import { Filter, Users } from "lucide-react";
import { PlayerLevel, PlayerStatus } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";

interface PlayerNotFoundProps {
  searchQuery: string;
  levelFilter?: PlayerLevel;
  statusFilter?: PlayerStatus;
  onClearSearch: () => void;
  onClearFilters: () => void;
  onResetAll: () => void;
}

export function PlayersNotFound({
  searchQuery,
  levelFilter,
  statusFilter,
  onClearSearch,
  onClearFilters,
  onResetAll,
}: PlayerNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-50"></div>
        <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-full p-6 shadow-xl">
          <Users className="h-12 w-12 text-muted-foreground opacity-80" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">No players found</h3>
      <p className="text-muted-foreground max-w-md mb-6 flex flex-col gap-2">
        <span>
          {searchQuery
            ? `No players match "${searchQuery}"`
            : "No players match your current filters"}
        </span>
        {levelFilter && <span>{`Level: ${levelFilter}`}</span>}
        {statusFilter && <span>{`Status: ${statusFilter}`}</span>}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {searchQuery && (
          <Button
            variant="outline"
            onClick={() => onClearSearch()}
            className="gap-2"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            Clear search
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => onClearFilters()}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Clear filters
        </Button>
        <Button onClick={() => onResetAll()} className="gap-2">
          <Users className="h-4 w-4" />
          Show all players
        </Button>
      </div>
    </div>
  );
}
