"use server";
import { getSelectedLocations } from "@/app/utils/libs/actions";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { optional, z } from "zod";

const FormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, { message: "Menu name must be at least 1 character long." }),
  price: z.number({ message: "Price must be a number." }),
  isAvailable: z.boolean().optional(),
  imageUrl: z.string().optional(),
  menuCategoryIds: z
    .array(z.number())
    .min(1, { message: "Please select at least one menu category." }),
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
  menuCategoryIds: true,
});

export const UpDateMenu = async (formData: FormData) => {
  const { id, name, price, isAvailable } = FormSchema.parse({
    id: Number(formData.get("updateMenuId")),
    name: formData.get("updateMenuName"),
    price: Number(formData.get("UpdatePrice")),
    isAvailable: formData.get("isAvailable") ? true : false,
  });

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
  try {
    const { name, price, menuCategoryIds, imageUrl } =
      CreateMenuValidation.parse({
        name: formData.get("menu"),
        price: Number(formData.get("price")),
        menuCategoryIds: formData
          .getAll("menuCategories")
          .map((id) => Number(id)),
        imageUrl: formData.get("imageUrl"),
      });
    //get data from formData
    /* const file = formData.get("file") as File; */
    const isAvailable = formData.get("isAvailable");

    //client side upload image to vercel blob can do at the same time
    const menu = await prisma.menu.create({
      data: { name, price, assetUrl: imageUrl },
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

    //server side upload image to vercel blob
    /*  if (file.size > 0) {
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
    } */
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errorMassage = e.errors.map((item) => item.message).join(", ");
      return { error: errorMassage };
    }
    return { error: "Something went wrong . Please contact our support." };
  }
  return { success: "Menu Created Successfully" };
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
    where: { id },
  });

  redirect("/backoffice/menus");
};
