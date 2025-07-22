import { Button } from '@workspace/ui/components/button';
import { Calendar } from 'lucide-react';

function MatchesEmptyState({
  selectedDate,
  setSearchQuery,
  setStatusFilter,
  setDate,
}: {
  selectedDate: Date | undefined;
  setSearchQuery: (v: string) => void;
  setStatusFilter: (v: string) => void;
  setDate: (d: Date | undefined) => void;
}) {
  return (
    <div className="text-center py-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Calendar className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No matches found</h3>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto">
        {selectedDate
          ? 'No match on this date. Try selecting a different date or clearing your filters.'
          : 'No match match your filters. Try changing your search criteria.'}
      </p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => {
          setSearchQuery('');
          setStatusFilter('all');
          setDate(undefined);
        }}
      >
        Clear all filters
      </Button>
    </div>
  );
}

export default MatchesEmptyState;
