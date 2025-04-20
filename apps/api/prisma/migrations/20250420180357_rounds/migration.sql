-- CreateEnum
CREATE TYPE "RoundStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "rounds" (
    "id" TEXT NOT NULL,
    "status" "RoundStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoundsToPlayer" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoundsToPlayer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RoundsToPlayer_B_index" ON "_RoundsToPlayer"("B");

-- AddForeignKey
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoundsToPlayer" ADD CONSTRAINT "_RoundsToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoundsToPlayer" ADD CONSTRAINT "_RoundsToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
