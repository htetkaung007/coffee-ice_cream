"use server";
import { getCompanyId } from "@/app/utils/libs/actions";
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
  if (!name) {
    redirect("/backoffice/locations?error=Location name is required");
  }
  const updateLocationId = formData.get("updateId");
  await prisma.loactions.update({
    data: {
      name,
    },
    where: {
      id: Number(updateLocationId),
    },
  });

  redirect("/backoffice/locations");
};
/* Create  */
export const CreateLocations = async (formData: FormData) => {
  const name = formData.get("name") as string;

  await prisma.loactions.create({
    data: {
      name,
      companyId: (await getCompanyId()) as number,
    },
  });
  redirect("/backoffice/locations");
};

export const DeleteLocations = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await prisma.tabels.deleteMany({
    where: { locationId: id },
  });
  await prisma.loactions.delete({
    where: { id },
  });
  redirect("/backoffice/locations");
};
