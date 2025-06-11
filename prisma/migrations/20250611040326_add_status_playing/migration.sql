-- CreateEnum
CREATE TYPE "PlayingStatus" AS ENUM ('FINISHED', 'INPROGGRESS', 'NOTPLAYING');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "playingStatus" "PlayingStatus" NOT NULL DEFAULT 'NOTPLAYING';
