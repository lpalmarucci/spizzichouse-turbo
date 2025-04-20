"use client";

import { Calendar, Trophy, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Detail, DetailHeader } from "@/components/detail";
import { MatchStatus } from "@workspace/api/qgl-types";
import { useGetMatch } from "@/features/match/match.hook";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { ScreenLoader } from "@/components/screen-loader";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

const getStatusColor = (status: string) => {
  switch (status) {
    case MatchStatus.Upcoming:
      return "bg-blue-500";
    case MatchStatus.InProgress:
      return "bg-green-500";
    case MatchStatus.Completed:
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-UK", { dateStyle: "short" });
};

interface MatchDetailProps {
  id: string;
}

export default function MatchDetail({ id }: MatchDetailProps) {
  const { data, isLoading, error } = useGetMatch(id);

  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect("/matches");
    }, 500);
    return;
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!data) {
    toast.warning("No match found!");
    setTimeout(() => {
      redirect("/matches");
    }, 500);
    return;
  }

  const { match } = data;

  return (
    <Detail>
      <DetailHeader
        headingText={match.title}
        editHref={`/matches/${id}/edit`}
        showEditButton={true}
        editButtonText="Edit match"
        backLocationHref="/matches"
      />
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Match Details</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(match.status)}>
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </Badge>
                {/*<CardDescription>Rule Set: {match.ruleSet}</CardDescription>*/}
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

          {/*<Card className="flex-1">*/}
          {/*  <CardHeader>*/}
          {/*    <CardTitle>Rules</CardTitle>*/}
          {/*    <CardDescription>Custom rules for this match</CardDescription>*/}
          {/*  </CardHeader>*/}
          {/*  <CardContent>*/}
          {/*    <ul className="list-disc list-inside space-y-2">*/}
          {/*      {match.customRules.map((rule, index) => (*/}
          {/*        <li key={index}>{rule}</li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </CardContent>*/}
          {/*</Card>*/}
        </div>

        <Tabs defaultValue="players">
          <div className="w-full flex items-center justify-between gap-2">
            <TabsList>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            <Button variant="outline" asChild>
              <Link href={`/matches/${id}/rounds`}>
                <Trophy />
                Manage rounds
              </Link>
            </Button>
          </div>
          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle>Participating Players</CardTitle>
                <CardDescription>Players in this match</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {match.players!.map((player) => (
                    <Card key={player.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            {player.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{player.full_name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Match Results</CardTitle>
                <CardDescription>
                  {match.status === MatchStatus.Completed
                    ? "Final standings and scores"
                    : "Results will be available once the match is completed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {match.status === MatchStatus.Completed ? (
                  <div className="space-y-4">
                    {/* Results would go here */}
                    <p>Results data would be displayed here.</p>
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Match has not been completed yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Detail>
  );
}
