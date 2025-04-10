import { MatchesSection } from "@/features/match/components/matches-section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MATCH_QUERY_KEY, useGetMatches } from "@/features/match/match.query";

export default async function MatchesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY],
    queryFn: useGetMatches,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchesSection />
    </HydrationBoundary>
  );
}
