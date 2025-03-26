"use server";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export const getTable = async (id: number) => {
  return await prisma.tabels.findFirst({
    where: { id },
  });
};

export const UpDateTable = async (formData: FormData) => {
  const name = formData.get("name") as string;

  const updateId = formData.get("updateId");

  await prisma.tabels.update({
    data: {
      name,
    },
    where: {
      id: Number(updateId),
    },
  });

  redirect("/backoffice/tables");
};
/* Create  */
export const CreateTable = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));

  await prisma.tabels.create({
    data: {
      name,
      locationId,
    },
  });
  redirect("/backoffice/tables");
};

export const DeleteTable = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await prisma.addons.deleteMany({
    where: { id },
  });

  redirect("/backoffice/addons");
};
