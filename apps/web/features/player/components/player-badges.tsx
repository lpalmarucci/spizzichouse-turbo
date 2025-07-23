import { Badge } from '@workspace/ui/components/badge';
import { Trophy } from 'lucide-react';
import { getLevelColor } from '@/features/player/utils';
import React from 'react';

type PlayerBadgesProps = {
  level: string;
  wins?: number;
};

export const PlayerBadges: React.FC<PlayerBadgesProps> = ({ level, wins }) => (
  <div className="flex items-center gap-2 mt-1">
    <Badge className={getLevelColor(level)}>{level}</Badge>
    {typeof wins === 'number' && (
      <Badge variant="outline" className="gap-1 font-semibold">
        <Trophy className="h-3 w-3 text-indigo-500" />
        {wins} vittorie
      </Badge>
    )}
  </div>
);
