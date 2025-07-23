import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { GET_MATCHES_HISTORY, MATCH_HISTORY_QUERY_KEY } from '@/features/match/match.query';
import { gqlRequest } from '@/utils/query';
import { GET_PLAYERS_HISTORY, PLAYERS_HISTORY_QUERY_KEY } from '@/features/player/player.query';
import { DashboardSection } from '@/features/dashboard/components/dashboard-section';

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_HISTORY_QUERY_KEY],
    queryFn: () => gqlRequest(GET_MATCHES_HISTORY),
  });

  await queryClient.prefetchQuery({
    queryKey: [PLAYERS_HISTORY_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS_HISTORY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardSection />
    </HydrationBoundary>
  );
}
