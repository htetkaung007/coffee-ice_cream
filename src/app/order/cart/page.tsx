import { Box, Button, Divider, Typography } from "@mui/material";
import { prisma } from "@/app/utils/prisma";

import {
  confirmCartOrder,
  deleteCartOrder,
  getTableTotalPrice,
} from "./action";
import Link from "next/link";
import { ORDERSTATUS } from "@prisma/client";

interface Props {
  searchParams: {
    tableId: string;
  };
}
export default async function CartPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  if (!searchParam.tableId) return null;
  const tableId = Number(searchParam.tableId);
  const cartOrders = await prisma.orders.findMany({
    where: { tableId, status: ORDERSTATUS.CART },
    include: { OrdersAddons: true, menu: true },
  });
  if (!cartOrders.length)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">No items in cart</Typography>
        <Link href={`/order?tableId=${tableId}`}>
          <Button variant="contained" sx={{ mt: 2 }}>
            Go To Home Page
          </Button>
        </Link>
      </Box>
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          maxWidth: 720,
          alignItems: "center",
          margin: "0 auto",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
          mt: 2,
        }}
      >
        {cartOrders.map(async (cartOrder) => {
          const { menu, quantity, id } = cartOrder;
          const orderAddons = await prisma.ordersAddons.findMany({
            where: { orderId: id },
            include: { addon: true },
          });
          const addons = orderAddons.map((orderAddon) => orderAddon.addon);
          return (
            <Box
              key={cartOrder.id}
              sx={{
                marginBottom: 2,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">{menu.name}</Typography>
                  <Typography variant="body1" color="green">
                    {" "}
                    {menu.price}
                  </Typography>
                </Box>

                {addons.map((addon) => {
                  return (
                    <Box
                      key={addon.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">{addon.name}</Typography>
                      <Typography variant="body2" color="green">
                        {addon.price}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box>
                <Typography variant="body1"> {quantity}</Typography>
              </Box>
              <Box>
                <Link
                  href={`/order/menus/${menu.id}?tableId=${tableId}&orderId=${cartOrder.id}`}
                >
                  <Button>Edit</Button>
                </Link>
                <Box component={"form"} action={deleteCartOrder}>
                  <input
                    type="hidden"
                    name="orderId"
                    defaultValue={cartOrder.id}
                  />
                  <Button variant="contained" color="error" type="submit">
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
        <Divider sx={{ width: "100%" }} />
        <Typography variant="h5" sx={{ my: 2 }}>
          Total Price is : {getTableTotalPrice(tableId)}
        </Typography>
        <Box component={"form"} action={confirmCartOrder}>
          <input type="hidden" name="tableId" defaultValue={tableId} />
          <Button variant="contained" type="submit" name="confirmOrder">
            Confirm Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
