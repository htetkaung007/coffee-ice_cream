import { Box, Typography } from "@mui/material";
import { Company, ORDERSTATUS } from "@prisma/client";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartButton } from "./CartButton";
import Link from "next/link";
import { prisma } from "@/app/utils/prisma";
interface Props {
  tableId: number;
  company: Company;
}

export async function OrderAppHeader({ company, tableId }: Props) {
  const cartOrders = await prisma.orders.findMany({
    where: { tableId: tableId, status: ORDERSTATUS.CART },
  });
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          bgcolor: "green",
          height: 60,
          px: 2,
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "blod", color: "white" }}>
          {company.name}
        </Typography>
      </Box>

      <Box sx={{ width: "100vw", display: { xs: "none", md: "flex" } }}>
        <Image
          alt="Order App Header"
          src={"/order-app-header.svg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: 0,
            height: "70%",
          }}
        >
          <Box
            sx={{
              height: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "blod", color: "white", fontSize: 20 }}
            >
              {company.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <CartButton tableId={tableId} cartOrders={cartOrders} />
    </Box>
  );
}
