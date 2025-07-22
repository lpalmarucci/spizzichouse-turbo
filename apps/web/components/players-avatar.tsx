import UserAvatar from './user-avatar';
import { Player } from '@workspace/api/qgl-types';

function PlayersAvatars({ players }: { players: Player[] }) {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {players.slice(0, 5).map((player) => (
        <UserAvatar name={player.full_name} key={player.id} />
      ))}
      {players.length > 5 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
          +{players.length - 5}
        </div>
      )}
    </div>
  );
}

export default PlayersAvatars;
