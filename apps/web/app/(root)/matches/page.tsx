import { MatchesSection } from "@/features/match/components/matches-section";
import { GET_MATCHES, MATCH_QUERY_KEY } from "@/features/match/match.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";

export default async function MatchesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, {}],
    queryFn: () => gqlRequest(GET_MATCHES, {}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchesSection />
    </HydrationBoundary>
  );
}
