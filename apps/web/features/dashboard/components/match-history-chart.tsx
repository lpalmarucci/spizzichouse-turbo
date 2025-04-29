"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useGetMatchesHistory } from "@/features/match/match.hook";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Total matches",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function MatchHistoryChart() {
  const { data, isFetching } = useGetMatchesHistory();

  if (isFetching) return <Skeleton />;

  return (
    <Card className="w-full flex">
      <CardHeader>
        <CardTitle>Match History</CardTitle>
        <CardDescription>Number of matches over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={data?.matches_history}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
