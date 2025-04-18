-- AddForeignKey
ALTER TABLE "SelectedLocations" ADD CONSTRAINT "SelectedLocations_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "Loactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
