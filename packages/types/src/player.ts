export type Player = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  level: PlayerLevel;
  status: PlayerStatus;
};

export enum PlayerLevel {
  BEGINNER,
  INTERMEDIATE,
  EXPERT,
}

export enum PlayerStatus {
  ACTIVE,
  INACTIVE,
}
