"use server";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export const getAddon = async (id: number) => {
  return await prisma.addons.findFirst({
    where: { id },
  });
};

export const UpDateAddon = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable");
  const updateAddonId = Number(formData.get("updateAddonId"));
  const addonCategoryId = Number(formData.get("updateAddonCategoryId"));
  console.log("Test addon", formData, isAvailable ? true : false);

  await prisma.addons.update({
    where: { id: updateAddonId },
    data: {
      name,
      price,
      isAvailable: isAvailable ? true : false,
      addonCategoryId,
    },
  });

  redirect("/backoffice/addons");
};
/* Create  */
export const CreateAddons = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price") as string);
  const addonCategoryId = Number(formData.get("addonCategory"));
  const isAvailable = formData.get("isAvailable");

  const addon = await prisma.addons.create({
    data: {
      name,
      price,
      isAvailable: isAvailable ? true : false,
      addonCategoryId,
    },
  });
  redirect("/backoffice/addons");
};

/* Force Delete Data Base */
export const DeleteAddon = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await prisma.addons.deleteMany({
    where: { id },
  });

  redirect("/backoffice/addons");
};

/* Update Data Base for soft delete */
export const DeleteUpdateAddon = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await prisma.addons.update({
    where: { id },
    data: { isArchived: true },
  });

  redirect("/backoffice/addons");
};
