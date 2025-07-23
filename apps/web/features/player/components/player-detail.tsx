'use client';

import { Detail, DetailHeader } from '@/components/detail';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { PlayerDetailCard } from '@/features/player/components/player-detail-card';
import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import PlayerStats from '@/features/player/components/player-stats';
import { PlayerDetailTabs } from '@/features/player/components/player-detail-tabs';
import { useGetPlayerStats } from '@/features/player/player.hook';
import { Skeleton } from '@workspace/ui/components/skeleton';

export function PlayerDetail({ id }: { id: string }) {
  const {
    data: { playerWithStats },
  } = useGetPlayerStats(id);

  const pathname = usePathname();
  return (
    <Detail>
      <DetailHeader
        headingText="Dettaglio giocatore"
        subHeadingText="Profilo giocatore e statistiche"
        backLocationHref="/players"
      >
        <Button asChild>
          <Link href={`${pathname}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit player
          </Link>
        </Button>
      </DetailHeader>
      <div className="grid lg:grid-cols-2 gap-4">
        <PlayerDetailCard id={id} />
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PlayerStats data={playerWithStats} />
        </Suspense>
      </div>
      <div className="mt-4">
        <PlayerDetailTabs id={id} />
      </div>
    </Detail>
  );
}
