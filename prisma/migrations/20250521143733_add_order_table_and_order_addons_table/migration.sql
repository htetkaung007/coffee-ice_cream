/*
  Warnings:

  - You are about to drop the column `isArchive` on the `AddonCategories` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ORDERSTATUS" AS ENUM ('CART', 'PENDING', 'COOKING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "AddonCategories" DROP COLUMN "isArchive";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,
    "status" "ORDERSTATUS" NOT NULL DEFAULT 'CART',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdersAddons" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "addonId" INTEGER NOT NULL,

    CONSTRAINT "OrdersAddons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Tabels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersAddons" ADD CONSTRAINT "OrdersAddons_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersAddons" ADD CONSTRAINT "OrdersAddons_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
