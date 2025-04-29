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
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format } from "date-fns";

const chartConfig = {
  total: {
    label: "Total matches",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const date = new Date();

export function MatchHistoryChart() {
  const { data, isFetching } = useGetMatchesHistory();

  if (isFetching) return <Skeleton />;

  const formattedData = data?.matches_history.map((item) => ({
    ...item,
    label: format(
      new Date(date.getFullYear(), item.month - 1, date.getDay()),
      "MMM",
    ),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Match History</CardTitle>
        <CardDescription>Number of matches over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={formattedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
