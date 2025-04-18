/*
  Warnings:

  - You are about to drop the column `isArchived` on the `MenuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `MenuCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "isArchived",
DROP COLUMN "isAvailable";
