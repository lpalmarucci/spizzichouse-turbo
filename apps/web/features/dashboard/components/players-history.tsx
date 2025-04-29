"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useGetPlayersHistory } from "@/features/player/player.hook";
import { format } from "date-fns";

const chartConfig = {
  total: {
    label: "Total",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const date = new Date();

export function PlayersHistory() {
  const { data, isFetching } = useGetPlayersHistory();

  if (isFetching) return <Skeleton />;

  const formattedData = data?.players_history.map((item) => ({
    ...item,
    label: format(
      new Date(date.getFullYear(), item.month - 1, date.getDay()),
      "MMM",
    ),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Players activity</CardTitle>
        <CardDescription>Active players over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={formattedData}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="total"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="total"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-total)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
