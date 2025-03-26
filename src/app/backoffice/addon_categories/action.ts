"use server";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export const getMenuAndAddonCategory = async (id: number) => {
  return await prisma.addonCategories.findFirst({
    where: { id },
    include: { menuAddonCategory: true },
  });
};

export const UpDateAddonCategory = async (formData: FormData) => {
  const name = formData.get("updateName") as string;
  const isRequired = formData.get("isRequired") as string;
  const updateMenuId = Number(formData.get("updateAddonCategoryId"));
  const menuIds = formData
    .getAll("updateMenuCategoryId")
    .map((id) => Number(id));
  await prisma.addonCategories.update({
    data: { name, isRequired: Boolean(isRequired) },
    where: {
      id: Number(updateMenuId),
    },
  });
  await prisma.menuAddonCategories.deleteMany({
    where: { MenuId: Number(updateMenuId) },
  });

  const data = menuIds.map((menuId) => ({
    addonCategoryId: updateMenuId,
    MenuId: menuId,
  }));
  await prisma.menuAddonCategories.createMany({ data });
  redirect("/backoffice/addon_categories");
};
/* Create  */
export const CreateAddonCategory = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const isRequired = formData.get("isRequired");
  const menuIds = formData.getAll("menuIds").map((id) => Number(id));

  const addonCategory = await prisma.addonCategories.create({
    data: { name, isRequired: Boolean(isRequired) },
  });
  const data = menuIds.map((menuId) => ({
    addonCategoryId: addonCategory.id,
    MenuId: menuId,
  }));
  await prisma.menuAddonCategories.createMany({ data });
  redirect("/backoffice/addon_categories");
};

/* Delete */
export const DeleteAddonCategory = async (formData: FormData) => {
  const id = Number(formData.get("Id"));

  await prisma.menuAddonCategories.deleteMany({
    where: { addonCategoryId: id },
  });

  await prisma.addonCategories.delete({
    where: { id },
  });

  redirect("/backoffice/addon_categories");
};
