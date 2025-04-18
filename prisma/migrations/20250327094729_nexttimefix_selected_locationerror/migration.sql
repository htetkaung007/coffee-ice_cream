/*
  Warnings:

  - You are about to drop the column `locationsId` on the `SelectedLocations` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `SelectedLocations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SelectedLocations" DROP CONSTRAINT "SelectedLocations_locationsId_fkey";

-- AlterTable
ALTER TABLE "SelectedLocations" DROP COLUMN "locationsId",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SelectedLocations" ADD CONSTRAINT "SelectedLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Loactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
