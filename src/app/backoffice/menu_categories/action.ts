"use server";

import { getCompanyId, getSelectedLocations } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number({ message: "MenuCategoryId is not found" }),
  name: z
    .string()
    .min(1, { message: "Menu name must be at least 1 character long." }),
  isAvailable: z.boolean().optional(),
});

const CreateMenuCategoryValidation = FormSchema.omit({ id: true });

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
    if (!id) redirect("/backoffice/menu_categories");
    await prisma.disableLocationMenuCategories.delete({ where: { id } });
  }
  redirect("/backoffice/menu_categories");
};
/* Post or Create */
export const CreateMenuCategory = async (formData: FormData) => {
  try {
    const { name, isAvailable } = CreateMenuCategoryValidation.parse({
      name: formData.get("menuCategory") as string,
      isAvailable: formData.get("isAvailable") ? true : false,
    });

    const companyId = await getCompanyId();
    const currentLocation = await getSelectedLocations();
    if (!currentLocation) return;
    if (!companyId) return;
    const menuCategory = await prisma.menuCategory.create({
      data: {
        name,
        companyId,
      },
    });
    if (!isAvailable) {
      await prisma.disableLocationMenuCategories.create({
        data: {
          MenuCategoryIds: Number(menuCategory.id),
          locationsId: currentLocation?.locationId,
        },
      });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errorMassage = e.errors.map((item) => item.message).join(", ");
      return { error: errorMassage };
    }
    return { error: "Something went wrong . Please contact our support." };
  }
  return { success: "Menu Created Successfully" };
};
/* Force Delete at data base*/
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

/* Soft Delete at data base*/
export const DeleteUpdateMenuCategory = async (formData: any) => {
  const deleteMenuCategoryId = Number(formData.get("menuCategoryId"));
  await prisma.menuMenCategory.updateMany({
    where: { menuCategoryId: deleteMenuCategoryId },
    data: { isArchived: true },
  });
  await prisma.menuCategory.update({
    where: { id: deleteMenuCategoryId },
    data: { isArchived: true },
  });
  redirect("/backoffice/menu_categories");
};
