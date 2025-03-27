import { PlayerLevel, PlayerStatus } from "@workspace/db";

export const getLevelColor = (level: string) => {
  switch (level) {
    case PlayerLevel.BEGINNER:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case PlayerLevel.INTERMEDIATE:
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case PlayerLevel.EXPERT:
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

export const getStatusColor = (status: PlayerStatus) => {
  switch (status) {
    case PlayerStatus.ACTIVE:
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case PlayerStatus.INACTIVE:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

export const getStatusText = (status: PlayerStatus) => {
  switch (status) {
    case PlayerStatus.ACTIVE:
      return "Attivo";
    case PlayerStatus.INACTIVE:
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
