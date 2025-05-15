import { Box, Menu, Typography } from "@mui/material";
import { OrderAppHeader } from "../components/OrderAppHeader";
import {
  getCompanyByTableId,
  getMenusByMenuCategoryIds,
  getOrderAppCompanyMenuCategories,
} from "../utils/libs/actions";

import MenuCategoriesTabs from "../components/MenuCategoriesTabs";
import { Prisma } from "@prisma/client";
import MenuOptions from "../components/MenuOptions";

interface Props {
  searchParams: {
    tableId: string;
  };
}
//For type include
export type MenuCategoryType = Prisma.MenuCategoryGetPayload<{
  include: { menuMenuCategory: true };
}>;
/* I want to design if menu is not avaiable the optical is low and out of stock */
export type MenuType = Prisma.MenuGetPayload<{
  include: { disableLocationMenus: true };
}>;

export default async function OrderApp({ searchParams }: Props) {
  const { tableId } = await searchParams;
  const tableIdNumber = parseInt(tableId, 10);
  if (isNaN(tableIdNumber)) {
    return <Typography>Invalid table ID</Typography>;
  }
  const company = await getCompanyByTableId(tableIdNumber);
  const menuCategories: MenuCategoryType[] =
    await getOrderAppCompanyMenuCategories(tableIdNumber);

  const menuCategoryIds = menuCategories.map((item) => item.id);

  const menus: MenuType[] = await getMenusByMenuCategoryIds(menuCategoryIds);

  return (
    <Box>
      <OrderAppHeader company={company} />
      <MenuCategoriesTabs
        menuCategories={menuCategories}
        menus={menus}
        tableId={Number(tableId)}
      />
    </Box>
  );
}
