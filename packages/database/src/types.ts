import { Match as PrismaMatch, Prisma } from "../generated/client";

export type MatchWithPlayers = PrismaMatch &
  Partial<
    Prisma.MatchGetPayload<{
      include: { players: true };
    }>
  >;
