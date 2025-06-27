import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default async function OrderPage() {
  redirect("/backoffice/order/pending");
}
