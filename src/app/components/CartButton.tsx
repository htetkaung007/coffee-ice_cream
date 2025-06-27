"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography } from "@mui/material";
import { Orders } from "@prisma/client";

import Link from "next/link";

interface Props {
  tableId: number;
  cartOrders: Orders[] | [];
}
export function CartButton({ tableId, cartOrders }: Props) {
  return (
    <Box>
      <Link href={`/order/cart?tableId=${tableId}`}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            right: { xs: 10, md: 20 },
            top: 10,
            alignItems: "center",
          }}
        >
          <ShoppingCartIcon
            sx={{ color: "white", fontSize: 30 }}
          ></ShoppingCartIcon>
          <Typography variant="body2" sx={{ color: "white" }}>
            {cartOrders.length}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
