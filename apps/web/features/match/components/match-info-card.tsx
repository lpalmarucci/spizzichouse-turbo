import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Calendar, Users } from 'lucide-react';
import { Match, MatchStatus } from '@workspace/api/qgl-types';

const getStatusColor = (status: string) => {
  switch (status) {
    case MatchStatus.Upcoming:
      return 'bg-blue-500';
    case MatchStatus.InProgress:
      return 'bg-green-500';
    case MatchStatus.Completed:
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-UK', { dateStyle: 'short' });
};

export const MatchInfoCard: React.FC<{ match: Match }> = ({ match }) => (
  <Card className="flex-1">
    <CardHeader>
      <CardTitle>Match Details</CardTitle>
      <div className="flex items-center gap-2 mt-2">
        <Badge className={getStatusColor(match.status)}>
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center text-sm">
        <Calendar className="mr-2 h-4 w-4 opacity-70" />
        <span>{formatDate(match.date)}</span>
      </div>
      <div className="flex items-center text-sm">
        <Users className="mr-2 h-4 w-4 opacity-70" />
        <span>{match.players!.length} players</span>
      </div>
      <div className="mt-2">
        <p className="text-sm">{match.description}</p>
      </div>
    </CardContent>
  </Card>
);
