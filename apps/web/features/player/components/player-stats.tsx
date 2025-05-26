"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useGetPlayerStats } from "@/features/player/player.hook";
import { ScreenLoader } from "@/components/screen-loader";
import { Progress } from "@workspace/ui/components/progress";

interface PlayerStatsProps {
  id: string;
}

export default function PlayerStats({ id }: PlayerStatsProps) {
  const { data, isFetching } = useGetPlayerStats(id);

  if (isFetching || !data) return <ScreenLoader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiche</CardTitle>
        <CardDescription>
          Panoramica delle prestazioni del gioatore
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full flex flex-col justify-center gap-6">
          <div className="w-full flex flex-col justify-center gap-2">
            <div className="w-full flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Win rate</span>
              <span className="font-semibold">
                {data.player_stats?.win_rate.toFixed(1)}%
              </span>
            </div>
            <Progress value={data.player_stats?.win_rate} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <PlayerStat
              label="Partite giocate"
              value={data.player_stats?.total_matches}
            />
            <PlayerStat label="Vittorie" value={data.player_stats?.wins} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col justify-center">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-bold text-2xl">{value}</span>
    </div>
  );
}
