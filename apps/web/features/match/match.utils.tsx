import { MatchStatus } from "@workspace/api/qgl-types";
import { Medal, Trophy } from "lucide-react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case MatchStatus.Upcoming:
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case MatchStatus.InProgress:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case MatchStatus.Completed:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

export const getRankingInfo = (position: number) => {
  switch (position) {
    case 1:
      return {
        icon: <Trophy className="h-4 w-4" />,
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
      };
    case 2:
      return {
        icon: <Medal className="h-4 w-4" />,
        color: "bg-slate-400",
        textColor: "text-slate-500",
      };
    case 3:
      return {
        icon: <Medal className="h-4 w-4" />,
        color: "bg-amber-600",
        textColor: "text-amber-500",
      };
    default:
      return {
        icon: <span className="text-sm font-medium">{position}</span>,
        color: "bg-slate-200",
        textColor: "text-slate-500",
      };
  }
};
