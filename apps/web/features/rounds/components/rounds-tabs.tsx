import { Tabs, TabsList, TabsTrigger, TabsContent } from '@workspace/ui/components/tabs';
import { Round, Player, Match } from '@workspace/api/qgl-types';
import { RoundsList } from '@/features/rounds/components/rounds-list';
import { Leaderboard } from '@/components/leaderboard';
import RoundsToolbar from './rounds-toolbar';
import { use } from 'react';
import { RoundContext, RoundContextType } from '../round.context';

const RoundsTabs: React.FC = () => {
  const { rounds, setRounds, players, match } = use<RoundContextType>(RoundContext);
  return (
    <Tabs defaultValue="rounds" className="w-full">
      <TabsList>
        <TabsTrigger value="rounds">Rounds</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
      </TabsList>
      <TabsContent value="rounds" className="py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Match Rounds</h3>
          <RoundsToolbar rounds={rounds} setRounds={setRounds} players={players} match={match} />
        </div>
        <RoundsList />
      </TabsContent>
      <TabsContent value="leaderboard" className="pt-4">
        <Leaderboard />
      </TabsContent>
    </Tabs>
  );
};

export default RoundsTabs;
