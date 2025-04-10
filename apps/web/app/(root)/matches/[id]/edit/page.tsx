import { MatchEditForm } from "@/features/match/components/match-edit-form";
import { Detail, DetailHeader } from "@/components/detail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MATCH_QUERY_KEY } from "@/features/match/match.query";
import { getMatchById } from "@/features/match/match.actions";

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MATCH_QUERY_KEY, id],
    queryFn: () => getMatchById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail>
        <DetailHeader
          editHref={`/matches/${id}`}
          headingText="Edit match"
          subHeadingText="Update the details, rules, and players for this match."
        ></DetailHeader>
        <div className="grid gap-4">
          <MatchEditForm matchId={id} />
        </div>
      </Detail>
    </HydrationBoundary>
  );
}
