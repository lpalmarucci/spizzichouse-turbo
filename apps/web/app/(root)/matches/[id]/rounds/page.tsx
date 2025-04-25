import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GET_ROUNDS, ROUNDS_QUERY_KEY } from "@/features/rounds/rounds.query";
import { gqlRequest } from "@/utils/query";
import { RoundsSection } from "@/features/rounds/components/rounds-section";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROUNDS_QUERY_KEY],
    queryFn: () => gqlRequest(GET_ROUNDS),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoundsSection matchId={id} />
    </HydrationBoundary>
  );
}
