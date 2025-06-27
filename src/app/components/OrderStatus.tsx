"use client";

import {
  Box,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Orders, ORDERSTATUS } from "@prisma/client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { updateOrderStatus } from "../backoffice/order/action ";

interface Props {
  order: Orders;
  isAdmin?: boolean;
}
export default function OrderStatusUpdate({ order, isAdmin }: Props) {
  const router = useRouter();
  useEffect(() => {
    if (order.status !== ORDERSTATUS.COMPLETED) {
      const interval = setInterval(() => {
        router.refresh();
      }, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [order]);
  const handleOrderStatusUpdate = async (
    evt: SelectChangeEvent<
      "CART" | "PENDING" | "COMPLETED" | "COOKING" | ORDERSTATUS
    >
  ) => {
    console.log("Updating order status to:", evt.target.value);

    await updateOrderStatus(order.id, evt.target.value as ORDERSTATUS);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: 1,
      }}
    >
      {isAdmin ? (
        <>
          <Typography sx={{ fontWeight: "bold" }}>Status :</Typography>
          <Select
            value={order.status}
            sx={{ maxHeight: 30 }}
            onChange={handleOrderStatusUpdate}
          >
            <MenuItem value={ORDERSTATUS.PENDING}>
              {ORDERSTATUS.PENDING}
            </MenuItem>
            <MenuItem value={ORDERSTATUS.COMPLETED}>
              {ORDERSTATUS.COMPLETED}
            </MenuItem>
            <MenuItem value={ORDERSTATUS.COOKING}>
              {ORDERSTATUS.COOKING}
            </MenuItem>
          </Select>
        </>
      ) : (
        <Typography sx={{ fontWeight: "blod" }}>{order.status}</Typography>
      )}
    </Box>
  );
}
