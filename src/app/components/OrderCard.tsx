import { Box, Card, Divider, Typography } from "@mui/material";

import {
  AddonsWithAddonCategory,
  OrdersWithMenuAddonsAndTable,
} from "../backoffice/order/[status]/page";

import { getTableTotalPriceByOrderId } from "../backoffice/order/action ";
import OrderStatusUpdate from "./OrderStatus";
interface Props {
  order: OrdersWithMenuAddonsAndTable;
  addons: AddonsWithAddonCategory[];
  isAdmin?: boolean;
}
export default async function OrderCard({ order, addons, isAdmin }: Props) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 280,
        height: 270,

        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          backgroundColor: "primary.main",
          px: 1,
          py: 0.5,
        }}
      >
        <Typography>{order.menu.name}</Typography>
        <Typography>Amount : {order.quantity}</Typography>
        <Typography>
          {isAdmin
            ? order.table.name
            : `$${await getTableTotalPriceByOrderId(order.id)}`}
        </Typography>
      </Box>
      <Box sx={{ px: 2, pt: 1 }}>
        <Box sx={{ height: 240 * 0.7, overflow: "scroll" }}>
          {order.OrdersAddons.length > 0 ? (
            order.OrdersAddons.map((orderAddon) => {
              const addon = addons.find(
                (addon) => addon.id === orderAddon.addonId
              );
              return (
                <Box key={orderAddon.id} sx={{ mb: 1 }}>
                  <Typography>{addon?.addonCategory.name}</Typography>
                  <Typography
                    key={addon?.id}
                    sx={{
                      fontSize: 14,
                      ml: 2,
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    {addon?.name} - ${addon?.price}
                  </Typography>
                  <Divider sx={{ mt: 0.5 }} />
                </Box>
              );
            })
          ) : (
            <Typography>NO addon</Typography>
          )}
        </Box>
      </Box>
      <Divider sx={{ mt: 1 }} />
      <OrderStatusUpdate order={order} isAdmin={isAdmin}></OrderStatusUpdate>
    </Card>
  );
}
