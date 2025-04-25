import { useGetRounds } from "@/features/rounds/rounds.hook";
import { ScreenLoader } from "@/components/screen-loader";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import RoundCard from "@/features/rounds/components/round-card";
import { Card } from "@workspace/ui/components/card";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";

type OfflineRound = {
  number: number;
  scores: {
    amount: number;
    playerId: string;
  }[];
};

export function RoundsList({ matchId }: { matchId: string }) {
  const { data, isFetching, error } = useGetRounds(matchId);
  const [rounds, setRounds] = useState<OfflineRound[]>([]);

  if (isFetching) {
    return <ScreenLoader />;
  }

  if (error) {
    toast.error(error.message);
    redirect(`/matches/${matchId}`);
    return;
  }

  function addRound() {
    setRounds((rounds) => {
      return [...rounds, { number: 0, scores: [] }];
    });
  }

  if (data.rounds.length == 0) {
    return (
      <Card className="p-8 text-center">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.rounds.map((round, index) => (
        <RoundCard round={round} key={round.id} />
      ))}
    </div>
  );
}
