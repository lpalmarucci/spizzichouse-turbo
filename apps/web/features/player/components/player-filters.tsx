import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { PlayerLevel, PlayerStatus, PlayerStats } from '@workspace/api/qgl-types';
import React from 'react';

type PlayerFiltersProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  levelFilter?: PlayerLevel;
  setLevelFilter: (val?: PlayerLevel) => void;
  statusFilter?: PlayerStatus;
  setStatusFilter: (val?: PlayerStatus) => void;
  sortField: keyof PlayerStats;
  setSortField: (val: keyof PlayerStats) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (val: 'asc' | 'desc') => void;
};

export const PlayerFilters: React.FC<PlayerFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  levelFilter,
  setLevelFilter,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) => (
  <div className="flex flex-col sm:flex-row justify-between gap-4">
    <div className="relative w-full sm:w-[300px]">
      <Input
        type="search"
        placeholder="Cerca giocatori..."
        className="pl-8 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Cerca giocatori"
      />
    </div>
    <div className="flex flex-wrap gap-2">
      <Select value={levelFilter} onValueChange={(value) => setLevelFilter(value as PlayerLevel)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filtra per livello" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Principiante">Principiante</SelectItem>
          <SelectItem value="Intermedio">Intermedio</SelectItem>
          <SelectItem value="Avanzato">Avanzato</SelectItem>
          <SelectItem value="Esperto">Esperto</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PlayerStatus)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filtra per stato" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Attivo</SelectItem>
          <SelectItem value="inactive">Inattivo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
