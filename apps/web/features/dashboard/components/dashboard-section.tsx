'use client';

import { Suspense } from 'react';
import { MatchHistoryChart } from '@/features/dashboard/components/match-history-chart';
import { PlayersHistory } from '@/features/dashboard/components/players-history';
import { RecentPlayersSection } from '@/features/dashboard/components/recent-players-section';
import { AnalyticsSection } from '@/features/dashboard/components/analytics-section';
import { SkeletonAnalyticsSection } from '@/features/dashboard/components/skeleton-analytics-section';

export function DashboardSection() {
  return (
    <div className="w-full flex flex-col items-center justify-between px-2 gap-8">
      <div className="w-full flex flex-col ">
        <h1 className="font-semibold text-2xl md:text-3xl tracking-tighter">Analytics</h1>
        <p className="text-lg text-muted-foreground">Insights and statistics for your card game matches</p>
      </div>
      <Suspense fallback={<SkeletonAnalyticsSection />}>
        <AnalyticsSection />
      </Suspense>
      <div className="w-full grid grid-cols-2 gap-2">
        <MatchHistoryChart />
        <PlayersHistory />
      </div>
      <RecentPlayersSection />
    </div>
  );
}
