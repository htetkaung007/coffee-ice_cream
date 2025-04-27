import ItemCard from "@/app/components/itemCard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { prisma } from "@/app/utils/prisma";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { getCompanyAddonCategories } from "@/app/utils/libs/actions";

const addonCategories = async () => {
  const addonCategories = await getCompanyAddonCategories();
  console.log("Hay this is addonCategory ", addonCategories);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/addon_categories/new"}>
          <Button variant="contained" sx={{ bgcolor: "#664343" }}>
            Add Addon Categories
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addonCategories.map((item) => (
          <ItemCard
            key={item.id}
            icon={<DashboardCustomizeIcon />}
            title={item.name}
            href={`/backoffice/addon_categories/${item.id}`}
          ></ItemCard>
        ))}
      </Box>
    </Box>
  );
};
export default addonCategories;
