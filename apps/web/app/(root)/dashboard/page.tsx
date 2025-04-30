import { AnalyticsSection } from "@/features/dashboard/components/analytics-section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  GET_MATCHES,
  GET_MATCHES_HISTORY,
  MATCH_HISTORY_QUERY_KEY,
  MATCH_QUERY_KEY,
} from "@/features/match/match.query";
import { gqlRequest } from "@/utils/query";
import {
  GET_PLAYERS,
  GET_PLAYERS_HISTORY,
  PLAYER_QUERY_KEY,
  PLAYERS_HISTORY_QUERY_KEY,
} from "@/features/player/player.query";
import { PlayerStatus, SortOrder } from "@workspace/api/qgl-types";

const params = {
  take: 10,
  matchOrderBy: {
    date: SortOrder.Desc,
  },
};

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, {}],
    queryFn: () => gqlRequest(GET_MATCHES, {}),
  });

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, params],
    queryFn: () => gqlRequest(GET_MATCHES, params),
  });

  await queryClient.prefetchQuery({
    queryKey: [PLAYER_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS, { status: PlayerStatus.Active }),
  });

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
      <AnalyticsSection />
    </HydrationBoundary>
  );
}
