"use client";
import ItemCard from "@/app/components/itemCard";

import { Box, Button } from "@mui/material";
import Link from "next/link";
import TableBarIcon from "@mui/icons-material/TableBar";
import { getLocationTables } from "@/app/utils/libs/actions";
import { useEffect, useState } from "react";
import { Tabels } from "@prisma/client";
const tables = () => {
  const [tables, setTables] = useState<Tabels[]>([]);
  useEffect(() => {
    handleGetLocationTables();
  }, []);
  const handleGetLocationTables = async () => {
    const currentLocationId = localStorage.getItem(
      "currentLocationId"
    ) as string;

    const locationTables = await getLocationTables(Number(currentLocationId));
    setTables(locationTables);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/tables/new"}>
          <Button variant="contained" sx={{ bgcolor: "#664343" }}>
            Add Table
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tables.map((item) => (
          <ItemCard
            key={item.id}
            icon={<TableBarIcon />}
            title={item.name}
            href={`/backoffice/tables/${item.id}`}
          ></ItemCard>
        ))}
      </Box>
    </Box>
  );
};
export default tables;
