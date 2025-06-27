import {
  getSelectedLocations,
  getSelectedLocationTables,
} from "@/app/utils/libs/actions";
import { Box, Button, ButtonGroup } from "@mui/material";
import { ORDERSTATUS, Prisma } from "@prisma/client";
import { prisma } from "@/app/utils/prisma";
import Link from "next/link";
import OrderCard from "@/app/components/OrderCard";

interface Props {
  params: {
    status: ORDERSTATUS;
  };
}

export type OrdersWithMenuAddonsAndTable = Prisma.OrdersGetPayload<{
  include: { menu: true; OrdersAddons: true; table: true };
}>;

export type AddonsWithAddonCategory = Prisma.AddonsGetPayload<{
  include: { addonCategory: true };
}>;
export default async function OrderStatusPage({ params }: Props) {
  const { status } = await params;
  if (!status) return null;
  const stautsUpperCase = status.toUpperCase();
  //idea
  function isValidOrderStatus(status: string): status is ORDERSTATUS {
    return ["CART", "PENDING", "COOKING", "COMPLETED", "CANCELLED"].includes(
      status
    );
  }
  if (!isValidOrderStatus(stautsUpperCase)) {
    return "Invalid status";
  }

  //taken form user email
  const tables = await getSelectedLocationTables();
  const tableIds = tables.map((table) => table.id);
  const orders: OrdersWithMenuAddonsAndTable[] = await prisma.orders.findMany({
    where: {
      status: stautsUpperCase,
      tableId: { in: tableIds },
    },
    include: { OrdersAddons: true, menu: true, table: true },
  });

  return (
    <Box>
      <ButtonGroup
        variant="outlined"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Link href={`/backoffice/order/pending`}>
          <Button
            variant={`${
              stautsUpperCase === ORDERSTATUS.PENDING ? "contained" : "outlined"
            }`}
          >
            Pending
          </Button>
        </Link>
        <Link href={`/backoffice/order/cooking`}>
          <Button
            variant={`${
              stautsUpperCase === ORDERSTATUS.COOKING ? "contained" : "outlined"
            }`}
          >
            Cooking
          </Button>
        </Link>
        <Link href={`/backoffice/order/completed`}>
          <Button
            variant={`${
              stautsUpperCase === ORDERSTATUS.COMPLETED
                ? "contained"
                : "outlined"
            }`}
          >
            Completed
          </Button>
        </Link>
        {/*  <Link href={`/backoffice/order/${ORDERSTATUS.CANCELLED}`}>
            Cancelled
          </Link> */}
      </ButtonGroup>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, mt: 6 }}>
        {orders.map(async (order) => {
          const orderAddonsIds = order.OrdersAddons.map((item) => item.addonId);
          const addons: AddonsWithAddonCategory[] =
            await prisma.addons.findMany({
              where: { id: { in: orderAddonsIds } },
              include: { addonCategory: true },
            });
          return <OrderCard order={order} addons={addons} isAdmin />;
        })}
      </Box>
    </Box>
  );
}
