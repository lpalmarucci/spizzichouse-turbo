import MatchDetail from "@/features/match/components/match-detail";
import { PreloadQuery } from "@/utils/apollo/server";
import { GET_MATCH_BY_ID } from "@/features/match/match.query";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return (
    <PreloadQuery query={GET_MATCH_BY_ID} variables={{ id }}>
      <MatchDetail id={id} />
    </PreloadQuery>
  );
}
