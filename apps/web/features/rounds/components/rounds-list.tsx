import RoundCard from "@/features/rounds/components/round-card";
import { Card } from "@workspace/ui/components/card";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { use } from "react";
import {
  RoundContext,
  RoundContextType,
} from "@/features/rounds/round.context";
import { RoundStatus } from "@workspace/api/qgl-types";

export function RoundsList({ matchId }: { matchId: string }) {
  const { rounds, setRounds } = use<RoundContextType>(RoundContext);

  function addRound() {
    setRounds((r) => [
      ...r,
      { number: 1, scores: [], status: RoundStatus.InProgress },
    ]);
  }

  if (rounds.length == 0) {
    return (
      <Card className="p-8 text-center space-y-6">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">No Rounds</h3>
          <p className="text-muted-foreground">
            This match doesn't have any rounds yet.
          </p>
          <Button className="mt-2" onClick={addRound}>
            <Plus className="h-4 w-4 mr-1" />
            Add First Round
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {rounds.map((round, index) => (
        <RoundCard round={round} key={`${round.number}-${index}`} />
      ))}
    </div>
  );
}
