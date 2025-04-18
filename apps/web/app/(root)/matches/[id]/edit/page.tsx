import { MatchEditForm } from "@/features/match/components/match-edit-form";
import { Detail, DetailHeader } from "@/components/detail";
import { PreloadQuery } from "@/utils/apollo/server";
import { GET_MATCH_BY_ID } from "@/features/match/match.query";

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PreloadQuery query={GET_MATCH_BY_ID} variables={{ id }}>
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
    </PreloadQuery>
  );
}
