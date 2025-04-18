import MatchDetail from "@/features/match/components/match-detail";
import { GET_MATCH_BY_ID, MATCH_QUERY_KEY } from "@/features/match/match.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";

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
    queryFn: () => gqlRequest(GET_MATCH_BY_ID, { id }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchDetail id={id} />
    </HydrationBoundary>
  );
}
