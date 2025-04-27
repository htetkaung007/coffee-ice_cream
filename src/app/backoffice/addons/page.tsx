import ItemCard from "@/app/components/itemCard";

import { Box, Button } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

import {
  getCompanyAddonCategories,
  getCompanyaddons,
} from "@/app/utils/libs/actions";

const addons = async () => {
  const addons = await getCompanyaddons();

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/addons/new"}>
          <Button variant="contained" sx={{ bgcolor: "#664343" }}>
            Add Addon
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addons.map((item) => (
          <ItemCard
            key={item.id}
            icon={<AddIcon />}
            title={item.name}
            href={`/backoffice/addons/${item.id}`}
          ></ItemCard>
        ))}
      </Box>
    </Box>
  );
};
export default addons;
