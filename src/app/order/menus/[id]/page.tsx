import MenuOptions from "@/app/components/MenuOptions";
import { OrderAppHeader } from "@/app/components/OrderAppHeader";
import { getCompanyByTableId } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import { Box } from "@mui/material";
import { Prisma } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tableId: string;
  };
}
export type MenuWithMenusAddonCategories = Prisma.MenuGetPayload<{
  include: { menuAddonCategories: true };
}>;
/* export type OrdersWithOrdersAddons = Prisma.OrderGetPayLoad<{
  include: { menuMenuCategory: true };
}>; */

export default async function MenuDetaisPage({ params, searchParams }: Props) {
  const { tableId } = await searchParams;
  const { id } = await params;
  const company = await getCompanyByTableId(Number(tableId));

  const menu = await prisma.menu.findFirst({
    where: { id: Number(id) },
    include: { menuAddonCategories: true },
  });
  const addonCategoryIds = menu?.menuAddonCategories.map(
    (item) => item.addonCategoryId
  );
  const addonCategories = await prisma.addonCategories.findMany({
    where: { id: { in: addonCategoryIds } },
  });
  const addons = await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIds } },
  });

  if (!menu || !company) return null;
  return (
    <Box>
      <OrderAppHeader company={company}></OrderAppHeader>
      <MenuOptions
        menu={menu}
        addonCategories={addonCategories}
        addons={addons}
        tableId={tableId}
      />
    </Box>
  );
}
