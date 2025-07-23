'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { RecentMatchTable } from '@/features/player/components/recent-match-table';
import React from 'react';

type PlayerDetailTabsProps = {
  id: string;
};

export const PlayerDetailTabs: React.FC<PlayerDetailTabsProps> = ({ id }) => (
  <Tabs defaultValue="recent_matches" className="w-full">
    <TabsList>
      <TabsTrigger value="recent_matches">Partite recenti</TabsTrigger>
      <TabsTrigger value="opponents" disabled>
        Avversari
      </TabsTrigger>
    </TabsList>
    <TabsContent value="recent_matches">
      <RecentMatchTable id={id} />
    </TabsContent>
  </Tabs>
);
