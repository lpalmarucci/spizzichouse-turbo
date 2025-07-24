import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import { Trophy, CalendarX2, Users } from 'lucide-react';
import { Match, MatchStatus } from '@workspace/api/qgl-types';
import { MatchDetailFinalResults } from '@/features/match/components/match-detail-final-results';
import { RoundsByRoundsScore } from '@/features/match/components/rounds-by-rounds-score';
import { MatchFinalStats } from '@/features/match/components/match-final-stats';

interface MatchDetailTabsProps {
  match: Match;
  onTerminateMatch: () => void;
  id: string;
}

export const MatchDetailTabs: React.FC<MatchDetailTabsProps> = ({ match, onTerminateMatch, id }) => (
  <Tabs defaultValue="players">
    <div className="w-full flex items-center justify-between gap-2">
      <TabsList>
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
      </TabsList>
      <div className="flex gap-2 items-center">
        {match.status === MatchStatus.InProgress && (
          <>
            <Button variant="outline" asChild>
              <Link href={`/matches/${id}/rounds`}>
                <Trophy />
                Manage rounds
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-amber-500/10 border-amber-500 text-amber-500 hover:text-amber-400 hover:bg-amber-500/20"
              onClick={onTerminateMatch}
            >
              <CalendarX2 />
              Termina partita
            </Button>
          </>
        )}
      </div>
    </div>
    <TabsContent value="players">
      <Card>
        <CardHeader>
          <CardTitle>Participating Players</CardTitle>
          <CardDescription>Players in this match</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {match.players!.map((player) => (
              <Card key={player.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {player.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{player.full_name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="results">
      {match.status === MatchStatus.Completed ? (
        <div className="space-y-6">
          <MatchDetailFinalResults match={match} />
          <RoundsByRoundsScore rounds={match.rounds} />
          <MatchFinalStats rounds={match.rounds} />
        </div>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Match Results</CardTitle>
              <CardDescription>"Results will be available once the match is completed</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center border rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <Trophy className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">No Results Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  This match has not been completed yet. Use the Manage Rounds feature to track scores and complete
                  rounds.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  </Tabs>
);
