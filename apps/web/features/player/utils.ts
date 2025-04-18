import { PlayerLevel, PlayerStatus } from "@workspace/api/qgl-types";

export const getLevelColor = (level: string) => {
  switch (level) {
    case PlayerLevel.Beginner:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case PlayerLevel.Intermediate:
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case PlayerLevel.Expert:
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

export const getStatusColor = (status: PlayerStatus) => {
  switch (status) {
    case PlayerStatus.Active:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case PlayerStatus.Inactive:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

export const getStatusText = (status: PlayerStatus) => {
  switch (status) {
    case PlayerStatus.Active:
      return "Attivo";
    case PlayerStatus.Inactive:
      return "Inattivo";
    default:
      return status;
  }
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};
