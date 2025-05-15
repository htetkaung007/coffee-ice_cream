import React from "react";

import { Menu, Prisma } from "@prisma/client";
import { getSelectedLocations } from "../utils/libs/actions";
import MenuCard from "./MenuCard";

export type MenuType = Prisma.MenuGetPayload<{
  include: { disableLocationMenus: true };
}>;

interface Props {
  menu: MenuType;
}

async function BackOfficeMenuCard({ menu }: Props) {
  const disableLocationMenus = menu.disableLocationMenus[0];
  const selectedLocation = await getSelectedLocations();

  const isAvailable =
    disableLocationMenus &&
    disableLocationMenus.locationsId === selectedLocation?.locationId
      ? false
      : true;

  return (
    <MenuCard
      name={menu.name}
      price={menu.price}
      imageUrl={menu.assetUrl || ""}
      href={`/backoffice/menus/${menu.id}`}
      isAvailable={isAvailable}
      showIsAvailable={true}
    />
  );
}

export default BackOfficeMenuCard;
