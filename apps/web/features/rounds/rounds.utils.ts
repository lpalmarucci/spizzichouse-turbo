import { RoundStatus } from "@workspace/api/qgl-types";

export const getStatusColor = (status: RoundStatus) => {
  switch (status) {
    case RoundStatus.InProgress:
      return "from-green-500 to-green-700";
    case RoundStatus.Completed:
      return "from-blue-500 to-blue-700";
    default:
      return "from-gray-500 to-gray-700";
  }
};
