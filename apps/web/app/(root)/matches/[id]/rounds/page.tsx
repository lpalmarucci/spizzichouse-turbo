import { QueryClient } from "@tanstack/react-query";
import { GET_ROUNDS, ROUNDS_QUERY_KEY } from "@/features/rounds/rounds.query";
import { gqlRequest } from "@/utils/query";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const id = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROUNDS_QUERY_KEY],
    queryFn: () => gqlRequest(GET_ROUNDS),
  });

  return <div></div>;
}
