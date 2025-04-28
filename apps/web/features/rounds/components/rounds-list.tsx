import RoundCard from "@/features/rounds/components/round-card";
import { Card } from "@workspace/ui/components/card";
import { AlertCircle } from "lucide-react";
import { use } from "react";
import {
  RoundContext,
  RoundContextType,
} from "@/features/rounds/round.context";

export function RoundsList() {
  const { rounds } = use<RoundContextType>(RoundContext);

  if (rounds.length == 0) {
    return (
      <Card className="p-8 text-center space-y-6">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-medium">No Rounds</h3>
          <p className="text-muted-foreground">
            This match doesn't have any rounds yet.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
      {rounds.map((round, index) => (
        <RoundCard round={round} key={`${round.number}-${index}`} />
      ))}
    </div>
  );
}
