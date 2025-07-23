import React from 'react';

interface PlayerStatCardProps {
  label: string;
  value: string | number;
}

export const PlayerStatCard: React.FC<PlayerStatCardProps> = ({ label, value }) => (
  <div className="flex flex-col justify-center" aria-label={label} tabIndex={0}>
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-bold text-2xl">{value}</span>
  </div>
);
