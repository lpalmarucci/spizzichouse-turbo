import { RecentPlayersMatchesTable } from '@/features/dashboard/components/recent-players-matches-table';
import { Card, CardTitle, CardContent, CardDescription, CardHeader } from '@workspace/ui/components/card';
import { Suspense } from 'react';
import { SkeletonTable } from '@workspace/ui/components/skeleton-table';

export function RecentPlayersSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
        <CardDescription>Latest completed and in-progress matches</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<SkeletonTable />}>
          <RecentPlayersMatchesTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default RecentPlayersSection;
