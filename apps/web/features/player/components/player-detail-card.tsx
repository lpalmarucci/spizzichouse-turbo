"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Calendar, House, Mail, Trophy } from "lucide-react";
import { getInitials, getLevelColor } from "@/features/player/utils";
import { Separator } from "@workspace/ui/components/separator";
import { useGetPlayerById } from "@/features/player/player.hook";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ScreenLoader } from "@/components/screen-loader";

interface PlayerDetailCardProps {
  id: string;
}

export function PlayerDetailCard({ id }: PlayerDetailCardProps) {
  const { data, isLoading, error } = useGetPlayerById(id);

  if (error) {
    toast.error(error.message);
    setTimeout(() => {
      redirect("/");
    }, 500);
    return;
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!data) {
    toast.warning("No match found!");
    setTimeout(() => {
      redirect("/");
    }, 500);
    return;
  }

  const { player } = data;
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
              {getInitials(player.full_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{player.full_name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getLevelColor(player.level)}>
                {player.level}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Trophy className="h-3 w-3 text-primary" />0 vittorie
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{player.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            Iscritto il {new Date(player.createdAt).toLocaleDateString("en-UK")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <House className="h-4 w-4 text-muted-foreground" />
          <span>Principato</span>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-2">Bio</h3>
          <p className="text-sm text-muted-foreground">{player.bio}</p>
        </div>

        <Separator />

        {/*<div>*/}
        {/*  <h3 className="text-sm font-medium mb-2">Achievements</h3>*/}
        {/*  <div className="flex flex-wrap gap-2">*/}
        {/*    {player.achievements.map((achievement, i) => (*/}
        {/*      <Badge key={i} variant="outline" className="gap-1">*/}
        {/*        <Medal className="h-3 w-3 text-primary" />*/}
        {/*        {achievement}*/}
        {/*      </Badge>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  );
}
