import { MatchStatus } from "@workspace/db";

export const getStatusColor = (status: string) => {
  switch (status) {
    case MatchStatus.UPCOMING:
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case MatchStatus.IN_PROGRESS:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case MatchStatus.COMPLETED:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};
