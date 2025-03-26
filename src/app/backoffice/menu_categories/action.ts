"use server";

import { getCompanyId } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export const UpDateMenuCategory = async (formData: FormData) => {
  const name = formData.get("updateMenuCategoryName") as string;
  const isAvailable = formData.get("isAvailable");
  const updateMenuCategoryId = formData.get("updateMenuCategoryId");
  console.log("Test", formData);
  await prisma.menuCategory.update({
    data: { name, isAvailable: isAvailable ? true : false },
    where: {
      id: Number(updateMenuCategoryId),
    },
  });
  redirect("/backoffice/menu_categories");
};

export const CreateMenuCategory = async (formData: FormData) => {
  //get data from formData
  const name = formData.get("menuCategory") as string;
  const isAvailable = formData.get("isAvailable");
  const companyId = await getCompanyId();
  if (!companyId) return;
  await prisma.menuCategory.create({
    data: {
      name,
      isAvailable: isAvailable ? true : false,
      companyId,
    },
  });
  redirect("/backoffice/menu_categories");
};

export const DeleteMenuCategory = async (formData: any) => {
  const deleteMenuCategoryId = Number(formData.get("menuCategoryId"));
  await prisma.menuMenCategory.deleteMany({
    where: { menuCategoryId: deleteMenuCategoryId },
  });
  await prisma.menuCategory.delete({
    where: { id: deleteMenuCategoryId },
  });
  redirect("/backoffice/menu_categories");
};
