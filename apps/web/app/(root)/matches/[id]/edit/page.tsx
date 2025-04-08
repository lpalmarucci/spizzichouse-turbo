import { MatchEditForm } from "@/features/match/components/match-edit-form";
import { Detail, DetailHeader } from "@/components/detail";

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Detail>
      <DetailHeader
        href={`/matches/${id}`}
        headingText="Edit match"
        subHeadingText="Update the details, rules, and players for this match."
        showEditButton={false}
      ></DetailHeader>
      <div className="grid gap-4">
        <MatchEditForm matchId={id} />
      </div>
    </Detail>
  );
}
