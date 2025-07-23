import { PlayerCard } from './player-card';
import { PlayerStats } from '@workspace/api/qgl-types';
import React from 'react';

type PlayerListProps = {
  players: PlayerStats[];
};

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {players.map((player) => (
      <div key={player.id}>
        <PlayerCard player={player} />
      </div>
    ))}
  </div>
);
