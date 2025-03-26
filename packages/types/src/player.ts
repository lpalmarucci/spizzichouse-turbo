export type Player = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  level: PlayerLevel;
  status: PlayerStatus;
  createdAt: Date;
};

export enum PlayerLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  EXPERT = "EXPERT",
}

export enum PlayerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
