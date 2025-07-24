import React from 'react';
import { DetailHeader } from '@/components/detail';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { Match, MatchStatus } from '@workspace/api/qgl-types';

interface MatchDetailHeaderProps {
  match: Match;
  pathname: string;
  setIsEndMatchDialogOpen: (open: boolean) => void;
  id: string;
}

export const MatchDetailHeader: React.FC<MatchDetailHeaderProps> = ({
  match,
  pathname,
  setIsEndMatchDialogOpen,
  id,
}) => (
  <DetailHeader headingText={match.title} backLocationHref="/matches">
    {match.status == MatchStatus.Upcoming && (
      <Button asChild>
        <Link href={pathname + '/edit'}>
          <Edit className="mr-2 h-4 w-4" />
          Edit match
        </Link>
      </Button>
    )}
  </DetailHeader>
);
