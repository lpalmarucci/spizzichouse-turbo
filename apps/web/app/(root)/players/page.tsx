import { PlayerSection } from "@/features/player/components/player-section";
import { Player } from "@workspace/api/qgl-types";
import { GET_PLAYERS } from "@/features/player/player.query";
import { query } from "@/utils/apollo/server";

export default async function PlayersPage() {
  const { data } = await query<{ players: Player[] }>({ query: GET_PLAYERS });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Giocatori</h1>
          <p className="text-muted-foreground">
            Gestisci e monitora i giocatori delle tue partite di carte
          </p>
        </div>
      </div>

      <PlayerSection players={data.players} />
    </div>
  );
}
