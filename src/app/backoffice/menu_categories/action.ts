"use server";

import { getCompanyId, getSelectedLocations } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

/* Get */
export const getMenuCategory = async (formData: FormData) => {};

/* Update */
export const UpDateMenuCategory = async (formData: FormData) => {
  const name = formData.get("updateMenuCategoryName") as string;
  const isAvailable = formData.get("isAvailable");
  const updateMenuCategoryId = formData.get("updateMenuCategoryId");

  console.log("Test", formData);
  await prisma.menuCategory.update({
    data: { name },
    where: {
      id: Number(updateMenuCategoryId),
    },
  });
  const currentLocation = await getSelectedLocations();
  if (!currentLocation) return;
  if (!isAvailable) {
    await prisma.disableLocationMenuCategories.create({
      data: {
        MenuCategoryIds: Number(updateMenuCategoryId),
        locationsId: currentLocation?.locationId,
      },
    });
  } else {
    const id = (
      await prisma.disableLocationMenuCategories.findFirst({
        where: { MenuCategoryIds: Number(updateMenuCategoryId) },
      })
    )?.id;
    await prisma.disableLocationMenuCategories.delete({ where: { id } });
  }
  redirect("/backoffice/menu_categories");
};
/* Post or Create */
export const CreateMenuCategory = async (formData: FormData) => {
  //get data from formData
  const name = formData.get("menuCategory") as string;
  const isAvailable = formData.get("isAvailable");
  const companyId = await getCompanyId();
  if (!companyId) return;
  await prisma.menuCategory.create({
    data: {
      name,
      companyId,
    },
  });
  await prisma;
  redirect("/backoffice/menu_categories");
};
/* Delete */
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
