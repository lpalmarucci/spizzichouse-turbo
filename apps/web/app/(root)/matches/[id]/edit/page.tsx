import { MatchEditForm } from "@/features/match/components/match-edit-form";
import { Detail, DetailHeader } from "@/components/detail";
import { GET_MATCH_BY_ID, MATCH_QUERY_KEY } from "@/features/match/match.query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gqlRequest } from "@/utils/query";

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, id],
    queryFn: () => gqlRequest(GET_MATCH_BY_ID, { id }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail>
        <DetailHeader
          editHref={`/matches/${id}`}
          headingText="Edit match"
          subHeadingText="Update the details, rules, and players for this match."
        />
        <div className="grid gap-4">
          <MatchEditForm id={id} />
        </div>
      </Detail>
    </HydrationBoundary>
  );
}
