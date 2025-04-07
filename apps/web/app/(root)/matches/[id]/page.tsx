import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MatchDetail from "@/features/match/components/match-detail";
import { MATCH_QUERY_KEY } from "@/features/match/match.query";
import { getMatchById } from "@/features/match/match.actions";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, id],
    queryFn: () => getMatchById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchDetail id={id} />
    </HydrationBoundary>
  );
}
