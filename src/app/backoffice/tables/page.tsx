import ItemCard from "@/app/components/itemCard";

import { Box, Button } from "@mui/material";
import Link from "next/link";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  getCompanyTables,
  getSelectedLocations,
  getSelectedLocationTables,
} from "@/app/utils/libs/actions";

const tables = async () => {
  const selectedLocationTables = await getSelectedLocationTables();
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
        {selectedLocationTables.map((item) => (
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
