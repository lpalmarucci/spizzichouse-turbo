import { RoundStatus } from "@workspace/api/qgl-types";

export const getStatusColor = (status: RoundStatus) => {
  switch (status) {
    case RoundStatus.InProgress:
      return "bg-green-500";
    case RoundStatus.Completed:
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
