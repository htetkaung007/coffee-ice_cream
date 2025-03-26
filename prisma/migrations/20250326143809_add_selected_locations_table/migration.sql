-- CreateTable
CREATE TABLE "SelectedLocations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "SelectedLocations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelectedLocations" ADD CONSTRAINT "SelectedLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedLocations" ADD CONSTRAINT "SelectedLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Loactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
