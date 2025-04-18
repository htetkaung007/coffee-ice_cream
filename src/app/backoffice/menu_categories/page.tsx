import ItemCard from "@/app/components/itemCard";

import { prisma } from "@/app/utils/prisma";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
import { getCompanyId, getSelectedLocations } from "@/app/utils/libs/actions";
import MenuCategoryCard from "@/app/components/menuCatategoryCard";
const MenuCategories = async () => {
  const companyId = await getCompanyId();
  const menuCategories = await prisma.menuCategory.findMany({
    where: { companyId },
    orderBy: { id: "asc" },
    include: { disableLocationMenuCategories: true },
  });
  const selectedlocationId = await getSelectedLocations();
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/menu_categories/new"}>
          <Button variant="contained" sx={{ bgcolor: "#664343" }}>
            Add MenuCategory
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategories.map((item) => {
          const isAvailable = item.disableLocationMenuCategories.find(
            (i) =>
              i.MenuCategoryIds === item.id &&
              i.locationsId === selectedlocationId?.locationId
          )
            ? false
            : true;
          return (
            <MenuCategoryCard
              key={item.id}
              title={item.name}
              href={`/backoffice/menu_categories/${item.id}`}
              isAvailable={isAvailable}
            ></MenuCategoryCard>
          );
        })}
      </Box>
    </Box>
  );
};
export default MenuCategories;
