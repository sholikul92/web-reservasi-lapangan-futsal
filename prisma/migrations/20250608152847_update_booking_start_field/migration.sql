/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookingStart` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingDate",
ADD COLUMN     "bookingStart" TIMESTAMP(3) NOT NULL;
