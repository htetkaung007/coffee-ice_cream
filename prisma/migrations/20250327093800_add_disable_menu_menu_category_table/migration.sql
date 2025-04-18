/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "isArchived",
DROP COLUMN "isAvailable";

-- CreateTable
CREATE TABLE "DisableLocationMenus" (
    "id" SERIAL NOT NULL,
    "locationsId" INTEGER NOT NULL,
    "MenusId" INTEGER NOT NULL,

    CONSTRAINT "DisableLocationMenus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisableLocationMenuCategories" (
    "id" SERIAL NOT NULL,
    "locationsId" INTEGER NOT NULL,
    "MenuCategoryIds" INTEGER NOT NULL,

    CONSTRAINT "DisableLocationMenuCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisableLocationMenus" ADD CONSTRAINT "DisableLocationMenus_MenusId_fkey" FOREIGN KEY ("MenusId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableLocationMenuCategories" ADD CONSTRAINT "DisableLocationMenuCategories_MenuCategoryIds_fkey" FOREIGN KEY ("MenuCategoryIds") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
