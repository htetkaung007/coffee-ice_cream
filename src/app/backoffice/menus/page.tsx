import { Box, Button } from "@mui/material";
import Link from "next/link";

import MenuCard from "@/app/components/BackOfficeMenuCard";
import { getCompanyMenus } from "@/app/utils/libs/actions";
import BackOfficeMenuCard from "@/app/components/BackOfficeMenuCard";
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
          <BackOfficeMenuCard menu={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
};
export default Menus;
