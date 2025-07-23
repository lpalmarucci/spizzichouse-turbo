import { Skeleton } from '@workspace/ui/components/skeleton';

export function SkeletonAnalyticsSection() {
  return (
    <div className="w-full flex items-center gap-2">
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[100px] w-full" />
    </div>
  );
}

export default SkeletonAnalyticsSection;
