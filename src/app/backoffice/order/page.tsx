import { getSelectedLocationTables } from "@/app/utils/libs/actions";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import TableBarIcon from "@mui/icons-material/TableBar";

import Link from "next/link";
import { getTotalPriceForEachTable, paidedPrice } from "./action ";
import ConfirmButton from "@/app/components/ConfirmButton";
interface Props {
  tableId: number;
}

export default async function OrderPage() {
  const tables = await getSelectedLocationTables();
  const tableIds = tables.map((table) => table.id);
  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-US");
  };
  return (
    <Box>
      <Typography variant="h4">Order Table</Typography>
      <Box sx={{ display: "flex", mt: 3, flexWrap: "wrap" }}>
        {tableIds.map(async (tableId) => (
          <Box sx={{ ml: 5 }} key={tableId}>
            <Card
              sx={{
                maxWidth: 400,
                minWidth: 250,
                width: "100%",
                textAlign: "center",
                boxShadow: 3,
                animation: "fadeInScale 0.5s ease-out",
                "@keyframes fadeInScale": {
                  "0%": {
                    opacity: 0,
                    transform: "scale(0.9) translateY(20px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "scale(1) translateY(0)",
                  },
                },
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "#2196f3", width: 56, height: 56 }}>
                    <TableBarIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                </Box>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 0.5 }}
                >
                  Table {tableId}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Total Table Price
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 500, color: "#1976d2", mb: 3 }}
                >
                  {formatPrice(await getTotalPriceForEachTable(tableId))} Kyat
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                  <Link href={`/backoffice/order/pending?tableId=${tableId}`}>
                    <Button variant="outlined" color="primary" fullWidth>
                      VIEW ALL ITEMS Detais
                    </Button>
                  </Link>
                  <ConfirmButton tableId={tableId} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
