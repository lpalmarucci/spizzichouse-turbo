import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Progress } from '@workspace/ui/components/progress';
import { type PlayerStats } from '@workspace/api/qgl-types';
import { PlayerStatCard } from './player-stat-card';

interface PlayerStatsProps {
  data: PlayerStats;
}

export default function PlayerStats({ data }: PlayerStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiche</CardTitle>
        <CardDescription>Panoramica delle prestazioni del gioatore</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full flex flex-col justify-center gap-6">
          <div className="w-full flex flex-col justify-center gap-2">
            <div className="w-full flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Win rate</span>
              <span className="font-semibold">{data.win_rate}%</span>
            </div>
            <Progress value={data.win_rate} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <PlayerStatCard label="Partite giocate" value={data.total_matches} />
            <PlayerStatCard label="Vittorie" value={data.wins} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
