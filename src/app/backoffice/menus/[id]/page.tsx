import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteUpdateMenu, getMenu, UpDateMenu } from "../action";
import {
  getCompanyMenuCategories,
  getSelectedLocations,
} from "@/app/utils/libs/actions";
import { upload } from "@vercel/blob/client";
import toast from "react-hot-toast";
import router from "next/router";
import UpdateMenuPage from "./NewMenuUpdateForm";

interface props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: props) {
  const { id } = await params;
  const menu = await getMenu(Number(id));
  const selectedLocation = await getSelectedLocations();
  const isAvailable = menu?.disableLocationMenus.find(
    (item) =>
      item.MenusId === Number(id) &&
      item.locationsId === selectedLocation?.locationId
  )
    ? false
    : true;
  if (!menu) return null;

  const selected = menu.menuMenuCategory.map((item) => item.menuCategoryId);

  const menuCategories = await getCompanyMenuCategories();

  return (
    <UpdateMenuPage
      menu={menu}
      menuCategories={menuCategories}
      isAvailable={isAvailable}
      selected={selected}
    />
  );
}
