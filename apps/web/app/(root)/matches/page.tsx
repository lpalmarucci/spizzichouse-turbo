import { MatchesSection } from "@/features/match/components/matches-section";
import { PreloadQuery } from "@/utils/apollo/server";
import { GET_MATCHES } from "@/features/match/match.query";

export default async function MatchesPage() {
  return (
    <PreloadQuery query={GET_MATCHES}>
      <MatchesSection />
    </PreloadQuery>
  );
}
