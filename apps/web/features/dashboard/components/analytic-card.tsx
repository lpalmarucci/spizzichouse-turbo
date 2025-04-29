"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

interface AnalyticCardProps {
  title: string;
  icon?: React.ReactNode;
  value: number;
  loading?: boolean;
}

export function AnalyticCard({
  title,
  icon,
  value,
  loading,
}: AnalyticCardProps) {
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="p-4 border rounded-md w-full flex gap-2 flex-col justify-center">
      <div className="w-full flex items-center justify-between">
        <span className="font-semibold">{title}</span>
        <div className="text-slate-200">{icon}</div>
      </div>
      <b className="text-3xl">{value}</b>
    </div>
  );
}
