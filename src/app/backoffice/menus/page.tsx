import { Box, Button } from "@mui/material";
import Link from "next/link";

import MenuCard from "@/app/components/MenuCard";
import { getCompanyMenus } from "@/app/utils/libs/actions";
const Menus = async () => {
  const menus = await getCompanyMenus();

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/menus/new"}>
          <Button variant="contained" sx={{ bgcolor: "#664343" }}>
            Add Menu
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menus.map((item) => (
          <MenuCard menu={item} isAvailable={true} key={item.id}></MenuCard>
        ))}
      </Box>
    </Box>
  );
};
export default Menus;
