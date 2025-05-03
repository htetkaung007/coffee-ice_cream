/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `AddonCategories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MenuAddonCategories` table. All the data in the column will be lost.
  - Added the required column `updateTime` to the `AddonCategories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTime` to the `DisableLocationMenuCategories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTime` to the `DisableLocationMenus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTime` to the `MenuAddonCategories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTime` to the `MenuMenCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTime` to the `SelectedLocations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddonCategories" DROP COLUMN "updatedAt",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Addons" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "DisableLocationMenuCategories" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DisableLocationMenus" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Loactions" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MenuAddonCategories" DROP COLUMN "updatedAt",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MenuCategory" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MenuMenCategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SelectedLocations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tabels" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
