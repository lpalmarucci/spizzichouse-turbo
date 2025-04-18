import { PlayerSection } from "@/features/player/components/player-section";
import { GET_PLAYERS } from "@/features/player/player.query";
import { PreloadQuery } from "@/utils/apollo/server";

export default async function PlayersPage() {
  return (
    <PreloadQuery query={GET_PLAYERS}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Giocatori</h1>
            <p className="text-muted-foreground">
              Gestisci e monitora i giocatori delle tue partite di carte
            </p>
          </div>
        </div>

        <PlayerSection />
      </div>
    </PreloadQuery>
  );
}
