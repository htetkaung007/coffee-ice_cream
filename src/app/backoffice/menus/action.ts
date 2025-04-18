"use server";
import { getSelectedLocations } from "@/app/utils/libs/actions";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export const getMenu = async (id: number) => {
  return await prisma.menu.findFirst({
    where: { id },
    include: {
      menuMenuCategory: true,
      disableLocationMenus: true,
    } /* also take menuMenuCategory table */,
  });
};

export const UpDateMenu = async (formData: FormData) => {
  const name = formData.get("updateMenuName") as string;
  const price = Number(formData.get("UpdatePrice"));
  const isAvailable = formData.get("isAvailable");
  const updateMenuId = formData.get("updateMenuId");

  const menuCategoryIds = formData
    .getAll("updateMenuCategoryId")
    .map((id) => Number(id));

  await prisma.menu.update({
    data: { name, price },
    where: {
      id: Number(updateMenuId),
    },
  });
  const menuCategoriesMenus = await prisma.menuMenCategory.findMany({
    where: { menuId: Number(updateMenuId) },
  });
  const menuCategoriesMenusIds = menuCategoriesMenus.map(
    (item) => item.menuCategoryId
  );
  const isSame =
    menuCategoryIds.length === menuCategoriesMenusIds.length &&
    menuCategoryIds.every((itemId: number) =>
      menuCategoriesMenusIds.includes(itemId)
    );
  if (!isSame) {
    await prisma.menuMenCategory.deleteMany({
      where: { menuId: Number(updateMenuId) },
    });

    const data = menuCategoryIds.map((menuCategoryId) => ({
      menuId: Number(updateMenuId),
      menuCategoryId,
    }));
    await prisma.menuMenCategory.createMany({ data });
  }
  if (!isAvailable) {
    const locationId = (await getSelectedLocations())?.locationId;
    if (!locationId) return;
    await prisma.disableLocationMenus.create({
      data: { MenusId: Number(updateMenuId), locationsId: locationId },
    });
  } else {
    const disableLocationMenus = await prisma.disableLocationMenus.findFirst({
      where: { MenusId: Number(updateMenuId) },
    });
    await prisma.disableLocationMenus.delete({
      where: { id: disableLocationMenus?.id },
    });
  }

  redirect("/backoffice/menus");
};
/* Create  */
export const CreateMenu = async (formData: FormData) => {
  //get data from formData
  const name = formData.get("menu") as string;
  const price = Number(formData.get("price") as string);
  const menuCategoryIds = formData
    .getAll("menuCategories")
    .map((id) => Number(id));
  const isAvailable = formData.get("isAvailable");
  const isValid = name && menuCategoryIds.length > 0;
  if (!isValid) return;

  const menu = await prisma.menu.create({
    data: { name, price },
  });
  const data = menuCategoryIds.map((menuCategoryId) => ({
    menuId: menu.id,
    menuCategoryId,
  }));

  await prisma.menuMenCategory.createMany({ data });
  const currentLoaction = (await getSelectedLocations())?.locationId;
  if (!currentLoaction) return;
  if (!isAvailable) {
    await prisma.disableLocationMenus.create({
      data: { MenusId: menu.id, locationsId: currentLoaction },
    });
  }
  redirect("/backoffice/menus");
};

export const DeleteMenu = async (formData: FormData) => {
  const id = Number(formData.get("menuId"));
  await prisma.menuAddonCategories.deleteMany({ where: { MenuId: id } });
  await prisma.menuMenCategory.deleteMany({
    where: { menuId: id },
  });
  await prisma.menu.delete({
    where: { id: id },
  });

  redirect("/backoffice/menus");
};
