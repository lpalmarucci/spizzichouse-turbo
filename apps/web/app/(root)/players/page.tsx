import { PlayerSection } from "@/features/player/components/player-section";
import {
  GET_PLAYERS_STATS,
  PLAYERS_STATS_QUERY_KEY,
} from "@/features/player/player.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";

export default async function PlayersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PLAYERS_STATS_QUERY_KEY],
    queryFn: () => gqlRequest(GET_PLAYERS_STATS),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Giocatori</h1>
            <p className="text-muted-foreground">
              Gestisci e monitora i giocatori delle tue partite di carte
            </p>
          </div>
        </div>

        <PlayerSection />
      </div>
    </HydrationBoundary>
  );
}
