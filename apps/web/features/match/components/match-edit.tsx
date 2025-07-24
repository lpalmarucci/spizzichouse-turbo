import { Detail, DetailHeader } from '@/components/detail';
import { MatchEditForm } from './match-edit-form';
import { Suspense } from 'react';
import { ScreenLoader } from '@/components/screen-loader';

interface MatchEditProps {
  id: string;
}

function MatchEdit({ id }: MatchEditProps) {
  return (
    <Detail>
      <DetailHeader headingText="Edit match" subHeadingText="Update the details, rules, and players for this match." />
      <div className="grid gap-4">
        <Suspense fallback={<ScreenLoader />}>
          <MatchEditForm id={id} />
        </Suspense>
      </div>
    </Detail>
  );
}

export default MatchEdit;
