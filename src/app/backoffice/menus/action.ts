"use server";
import { getSelectedLocations } from "@/app/utils/libs/actions";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  price: z.number(),
  isAvailable: z.boolean(),
});

export const getMenu = async (id: number) => {
  return await prisma.menu.findFirst({
    where: { id },
    include: {
      menuMenuCategory: true,
      disableLocationMenus: true,
    } /* also take menuMenuCategory table */,
  });
};

const CreateMenuValidation = FormSchema.omit({ id: true });
const DeleteMenuValidation = FormSchema.omit({
  name: true,
  price: true,
  isAvailable: true,
});

export const UpDateMenu = async (formData: FormData) => {
  const { id, name, price, isAvailable } = FormSchema.parse({
    id: Number(formData.get("updateMenuId")),
    name: formData.get("updateMenuName"),
    price: Number(formData.get("UpdatePrice")),
    isAvailable: formData.get("isAvailable") ? true : false,
  });
  /*  const name = formData.get("updateMenuName") as string;
  const price = Number(formData.get("UpdatePrice"));
  const isAvailable = formData.get("isAvailable");
  const id = Number(formData.get("updateMenuId")); */

  const menuCategoryIds = formData
    .getAll("updateMenuCategoryId")
    .map((id) => Number(id));

  await prisma.menu.update({
    data: { name, price },
    where: {
      id,
    },
  });
  const menuCategoriesMenus = await prisma.menuMenCategory.findMany({
    where: { menuId: id },
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
      where: { menuId: id },
    });

    const data = menuCategoryIds.map((menuCategoryId) => ({
      menuId: id,
      menuCategoryId,
    }));
    await prisma.menuMenCategory.createMany({ data });
  }

  /*  const disableLocationMenusId = await prisma.disableLocationMenus.findFirst({
    where: { MenusId: Number(updateMenuId) },
  }); */

  if (!isAvailable) {
    const locationId = (await getSelectedLocations())?.locationId;
    if (!locationId) return;
    await prisma.disableLocationMenus.create({
      data: { MenusId: id, locationsId: locationId },
    });
  } else {
    const disableLocationMenus = await prisma.disableLocationMenus.findFirst({
      where: { MenusId: id },
    });
    if (!disableLocationMenus) return redirect("/backoffice/menus");
    await prisma.disableLocationMenus.delete({
      where: { id: disableLocationMenus?.id },
    });
  }

  redirect("/backoffice/menus");
};
/* Create  */
export const CreateMenu = async (formData: FormData) => {
  const { name, price } = CreateMenuValidation.parse({
    name: formData.get("menu"),
    price: Number(formData.get("price")),
  });
  //get data from formData

  const file = formData.get("file") as File;
  const menuCategoryIds = formData
    .getAll("menuCategories")
    .map((id) => Number(id));
  const isAvailable = formData.get("isAvailable");
  const isValid = menuCategoryIds.length > 0;
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
  if (file.name) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { url } = await put(
      `coffee&ice-cream/menuPhoto-${new Date().getTime()}-${file.name}.png`,
      buffer,
      {
        access: "public",
      }
    );
    await prisma.menu.update({
      where: { id: menu.id },
      data: { ...menu, assetUrl: url },
    });
  }
  redirect("/backoffice/menus");
};
/* Delete */
export const DeleteMenu = async (formData: FormData) => {
  const { id } = DeleteMenuValidation.parse({
    id: Number(formData.get("menuId")),
  });

  await prisma.menuAddonCategories.deleteMany({ where: { MenuId: id } });
  await prisma.menuMenCategory.deleteMany({
    where: { menuId: id },
  });
  await prisma.menu.delete({
    where: { id: id },
  });

  redirect("/backoffice/menus");
};
