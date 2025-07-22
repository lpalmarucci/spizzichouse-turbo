import { Match } from "@workspace/api/qgl-types";
import { MatchCard } from "./match-card";

function MatchesList({ matches, onDelete }: { matches: Match[]; onDelete: (id: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => (
        <div key={match.id}>
          <MatchCard match={match} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default MatchesList;