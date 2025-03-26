import ItemCard from "@/app/components/itemCard";

import { prisma } from "@/app/utils/prisma";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
import { getCompanyId } from "@/app/utils/libs/actions";
const MenuCategories = async () => {
  const companyId = await getCompanyId();
  const menuCategories = await prisma.menuCategory.findMany({
    where: { companyId },
  });

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
        {menuCategories.map((item) => (
          <ItemCard
            key={item.id}
            icon={<CategoryIcon />}
            title={item.name}
            href={`/backoffice/menu_categories/${item.id}`}
          ></ItemCard>
        ))}
      </Box>
    </Box>
  );
};
export default MenuCategories;
