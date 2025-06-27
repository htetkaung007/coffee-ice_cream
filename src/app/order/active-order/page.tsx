import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { prisma } from "@/app/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import { getTableTotalPrice } from "../cart/action";
interface Props {
  searchParams: {
    tableId: string;
  };
}
export default async function ActiveOrderPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  if (!searchParam.tableId) return null;
  const tableId = Number(searchParam.tableId);

  const cartOrders = await prisma.orders.findMany({
    where: { tableId },
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
            </Box>
          );
        })}
        <Divider sx={{ width: "100%" }} />
        <Typography variant="h5" sx={{ my: 2 }}>
          Total Price is : {getTableTotalPrice(tableId, ORDERSTATUS.PENDING)}
        </Typography>
      </Box>
    </Box>
  );
}
