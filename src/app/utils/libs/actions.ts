"use server";

import { getServerSession, User } from "next-auth";
import { prisma } from "../prisma";
import { createQRCodeUrl } from "@/app/backoffice/tables/action";
import { log } from "console";

export async function getUser(email: string) {
  return await prisma.user.findFirst({ where: { email } });
}

export async function createDefaultData(nextUser: User) {
  const { name, email } = nextUser;
  const company = await prisma.company.create({
    data: { name: "Default Company" },
  });
  const user = await prisma.user.create({
    data: { name: String(name), email: String(email), companyId: company.id },
  });
  const menuCategory = await prisma.menuCategory.create({
    data: { name: "Default MenuCategory", companyId: company.id },
  });

  const menu = await prisma.menu.create({
    data: {
      name: "Default Menu",
      price: 100,
      assetUrl:
        "https://5ez9pz51cl93qmhn.public.blob.vercel-storage.com/Default%20MenuIcon-8J6xP2FAGf6AoosGMi7w7Lg6nUi4zx.png",
    },
  });

  await prisma.menuMenCategory.create({
    data: { menuId: menu.id, menuCategoryId: menuCategory.id },
  });

  const addonCategory = await prisma.addonCategories.create({
    data: { name: "Default Addon Category" },
  });
  await prisma.menuAddonCategories.create({
    data: { MenuId: menu.id, addonCategoryId: addonCategory.id },
  });
  const addonNames = ["Defalult Addon1", "Default Addon2", "Default Addon3"];
  const data = addonNames.map((addonName) => ({
    name: addonName,
    addonCategoryId: addonCategory.id,
    price: 10,
  }));

  await prisma.addons.createMany({
    data,
  });
  const loaction = await prisma.loactions.create({
    data: { name: "Default Location", companyId: company.id },
  });

  await prisma.selectedLocations.create({
    data: { userId: user.id, locationId: loaction.id },
  });

  const table = await prisma.tabels.create({
    data: {
      name: "Default Table",
      locationId: loaction.id,
      qrcodeImageUrl: "",
    },
  });
  const url = await createQRCodeUrl(table);
  await prisma.tabels.update({
    data: { ...table, qrcodeImageUrl: url },
    where: { id: table.id },
  });

  await prisma.selectedLocations.create({
    data: { userId: user.id, locationId: loaction.id },
  });
}

export async function getCompanyId() {
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email || "" },
  });
  const company = await prisma.company.findFirst({
    where: { id: user?.companyId },
  });

  return company?.id;
}

export async function getCompanyMenuCategories() {
  const companyId = await getCompanyId();
  const menu_categories = await prisma.menuCategory.findMany({
    where: { companyId, isArchived: false },
    orderBy: { id: "asc" },
  });
  return menu_categories;
}

export async function getCompanyMenus() {
  const menuCategories = await getCompanyMenuCategories();
  const menuCategoryIds = menuCategories.map((item) => item.id);
  const menuMenuCategories = await prisma.menuMenCategory.findMany({
    where: { menuCategoryId: { in: menuCategoryIds } },
  });
  const menuIds = menuMenuCategories.map((item) => item.menuId);
  return await prisma.menu.findMany({
    where: { id: { in: menuIds }, isArchived: false },
    include: { disableLocationMenus: true },
  });
}

export async function getCompanyAddonCategories() {
  const menus = await getCompanyMenus();
  const menuIds = menus.map((item) => item.id);
  const menuAddonIds = await prisma.menuAddonCategories.findMany({
    where: { MenuId: { in: menuIds } },
  });
  const addonCategoryId = menuAddonIds.map((item) => item.addonCategoryId);
  const addonCategories = await prisma.addonCategories.findMany({
    where: { id: { in: addonCategoryId }, isArchived: false },
  });

  return addonCategories;
}

export const getCompanyaddons = async () => {
  const addonCategories = await getCompanyAddonCategories();
  const addonCategoryIds = addonCategories.map((item) => item.id);
  return await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIds }, isArchived: false },
  });
};

export async function getCompanyLocations() {
  const loactions = await prisma.loactions.findMany({
    orderBy: { id: "asc" },
    where: { companyId: await getCompanyId(), isArchived: false },
  });
  return loactions;
}

export async function getDataUserId() {
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email || "" },
  });

  return user?.id;
}

export async function getSelectedLocations() {
  const loactions = await prisma.selectedLocations.findFirst({
    orderBy: { id: "asc" },
    where: { userId: await getDataUserId() },
  });
  return loactions;
}

export async function getCompanyTables() {
  const location = await getCompanyLocations();
  const locationId = location.map((item) => item.id);
  return await prisma.tabels.findMany({
    orderBy: { id: "asc" },
    where: { locationId: { in: locationId }, isArchived: false },
  });
}

export async function getSelectedLocationTables() {
  const selectedLocation = await getSelectedLocations();
  return await prisma.tabels.findMany({
    where: { locationId: selectedLocation?.locationId },
  });
}

export async function getDisabledLoactionMenus() {
  const selectedLocation = await getSelectedLocations();
  return await prisma.disableLocationMenus.findMany({
    where: { locationsId: selectedLocation?.id },
  });
}
