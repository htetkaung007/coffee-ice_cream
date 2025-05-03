"use server";
import {
  getCompanyId,
  getCompanyLocations,
  getDataUserId,
  getSelectedLocations,
} from "@/app/utils/libs/actions";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export const getLocation = async (id: number) => {
  return await prisma.loactions.findFirst({
    where: { id },
  });
};

export const UpDateLocation = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const userId = (await getDataUserId()) as number;
  const userIdLocation = await prisma.selectedLocations.findFirst({
    where: { userId },
  });
  const companyLocation = await getCompanyLocations();
  const selectedLocationsId = userIdLocation?.id;
  const updateLocationId = formData.get("updateId");
  if (!name) {
    redirect("/backoffice/locations?error=Location name is required");
  }
  const currentLocationId = formData.get("currentLocaationId");
  await prisma.loactions.update({
    data: {
      name,
    },
    where: {
      id: Number(updateLocationId),
    },
  });

  if (currentLocationId) {
    await prisma.selectedLocations.update({
      data: { locationId: Number(updateLocationId) },
      where: { id: selectedLocationsId },
    });
  } else {
    await prisma.selectedLocations.update({
      data: { locationId: companyLocation[0].id },
      where: { id: selectedLocationsId },
    });
  }
  redirect("/backoffice/locations");
};
/* Create  */
export const CreateLocations = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const location = await prisma.loactions.create({
    data: {
      name,
      companyId: (await getCompanyId()) as number,
    },
  });

  redirect("/backoffice/locations");
};
/* Force Delete Data Base */
export const DeleteLocations = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  const currentLocationId = (await getSelectedLocations())?.locationId;
  if (id === currentLocationId) {
    redirect("/backoffice/locations?error=Current Location Cann't be Delete");
  }
  await prisma.tabels.deleteMany({
    where: { locationId: id },
  });
  await prisma.loactions.delete({
    where: { id },
  });
  redirect("/backoffice/locations");
};

/* Update dataBase for Delete Method */
export const DeleteUpdateLocations = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  const currentLocationId = (await getSelectedLocations())?.locationId;
  if (id === currentLocationId) {
    redirect("/backoffice/locations?error=Current Location Cann't be Delete");
  }
  /* I don't know yet it is need or not */
  await prisma.tabels.updateMany({
    where: { locationId: id },
    data: { isArchived: true },
  });
  await prisma.loactions.update({
    where: { id },
    data: { isArchived: true },
  });
  redirect("/backoffice/locations");
};
