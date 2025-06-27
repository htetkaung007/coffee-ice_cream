import MenuOptions, {
  OrdersWithOrderAddons,
} from "@/app/components/MenuOptions";
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
    orderId: string;
  };
}
export type MenuWithMenusAddonCategories = Prisma.MenuGetPayload<{
  include: { menuAddonCategories: true };
}>;

export default async function MenuDetaisPage({ params, searchParams }: Props) {
  const { tableId, orderId } = await searchParams;
  if (!tableId) return null;
  const tableIdNumber = parseInt(tableId, 10);
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
  //check the orderId is exists ?
  let order: OrdersWithOrderAddons | null = null;
  if (orderId) {
    order = await prisma.orders.findFirst({
      where: { id: Number(orderId), tableId: Number(tableId) },
      include: { OrdersAddons: true },
    });
  }

  if (!menu || !company) return null;
  return (
    <Box>
      <OrderAppHeader
        company={company}
        tableId={tableIdNumber}
      ></OrderAppHeader>
      <MenuOptions
        order={order}
        menu={menu}
        addonCategories={addonCategories}
        addons={addons}
        tableId={tableId}
      />
    </Box>
  );
}
