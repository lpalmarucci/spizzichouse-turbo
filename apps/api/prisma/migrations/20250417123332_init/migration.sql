-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('UPCOMING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PlayerLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "players" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" "PlayerLevel" NOT NULL DEFAULT 'BEGINNER',
    "status" "PlayerStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "MatchStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" DOUBLE PRECISION,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchToPlayer" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MatchToPlayer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MatchToPlayer_B_index" ON "_MatchToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_MatchToPlayer" ADD CONSTRAINT "_MatchToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToPlayer" ADD CONSTRAINT "_MatchToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
