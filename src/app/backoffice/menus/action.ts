"use server";
import { getSelectedLocations } from "@/app/utils/libs/actions";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { optional, z } from "zod";

const FormSchema = z.object({
  id: z
    .number({ message: "Required field id is missing." })
    .gt(0, { message: "ID is Missing" }),
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
const UpdateMenuValidation = FormSchema.omit({ menuCategoryIds: true });
/* Update */
export const UpDateMenu = async (formData: FormData) => {
  console.log("FormData", formData);
  try {
    const { id, name, price, isAvailable } = UpdateMenuValidation.parse({
      id: Number(formData.get("updateMenuId")),
      name: formData.get("updateMenuName"),
      price: Number(formData.get("UpdatePrice")),
      isAvailable: formData.get("isAvailable") ? true : false,
    });
    const menu = await prisma.menu.findFirst({ where: { id } });
    if (!menu) return { error: "Menu not found." };
    const imageUrl = formData.get("imageUrl") as string;
    const menuCategoryIds = formData
      .getAll("updateMenuCategoryIds")
      .map((id) => Number(id));

    await prisma.menu.update({
      data: { name, price, assetUrl: imageUrl ? imageUrl : menu.assetUrl },
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
      if (!disableLocationMenus) return;
      await prisma.disableLocationMenus.delete({
        where: { id: disableLocationMenus?.id },
      });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errorMassage = e.errors.map((item) => item.message).join(", ");
      return { error: errorMassage };
    }
    return { error: "Something went wrong . Please contact our support." };
  }
};
/* Create  */
export const CreateMenu = async (formData: FormData) => {
  console.log("FormDataCreate", formData);
  try {
    const { name, price, menuCategoryIds, imageUrl } =
      CreateMenuValidation.parse({
        name: formData.get("menu"),
        price: Number(formData.get("price")),
        menuCategoryIds: formData
          .getAll("menuCategories")
          .map((id) => Number(id)),
        imageUrl:
          formData.get("imageUrl") ||
          "https://5ez9pz51cl93qmhn.public.blob.vercel-storage.com/Default%20MenuIcon-8J6xP2FAGf6AoosGMi7w7Lg6nUi4zx.png",
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
/* Force Delete at Data Base */
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
/* Soft Delete at Data Base */
export const DeleteUpdateMenu = async (formData: FormData) => {
  console.log("FormDataDelete", formData);

  try {
    const { id } = DeleteMenuValidation.parse({
      id: Number(formData.get("menuId")),
    });

    await prisma.menuAddonCategories.updateMany({
      where: { MenuId: id },
      data: { isArchived: true },
    });
    await prisma.menuMenCategory.updateMany({
      where: { menuId: id },
      data: { isArchived: true },
    });
    await prisma.menu.update({
      where: { id },
      data: { isArchived: true },
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      /* const errorMassage = e.errors.map((item) => item.message).join(", "); */
      return { error: e.errors };
    }
    return {
      error: [
        { message: "Something went wrong . Please contact our support." },
      ],
    };
  }
};
