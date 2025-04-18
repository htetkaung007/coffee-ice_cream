import { config } from "@/app/utils/config";
import { prisma } from "@/app/utils/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteMenuCategory, UpDateMenuCategory } from "../action";
import { getSelectedLocations } from "@/app/utils/libs/actions";

interface props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: props) {
  const { id } = await params;
  if (!id) return;
  const selectedLocation = await getSelectedLocations();
  const menuCategories = await prisma.menuCategory.findFirst({
    where: { id: Number(id) },
    include: { disableLocationMenuCategories: true },
  });
  if (!menuCategories) return null;

  const disableLocationMenuCategories =
    menuCategories?.disableLocationMenuCategories;

  const isAvailable = disableLocationMenuCategories.find(
    (item) =>
      item.MenuCategoryIds === Number(id) &&
      item.locationsId === selectedLocation?.locationId
  )
    ? false
    : true;

  return (
    <Box>
      <Box
        action={DeleteMenuCategory}
        component={"form"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        <Typography variant="h4">Update MenuCategory Page</Typography>
        <input defaultValue={id} type="hidden" name="menuCategoryId"></input>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          color="error"
        >
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        sx={{ display: "flex", flexDirection: "column" }}
        action={UpDateMenuCategory}
      >
        <TextField
          defaultValue={menuCategories?.name}
          name="updateMenuCategoryName"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <input defaultValue={id} type="hidden" name="updateMenuCategoryId" />
        <FormControlLabel
          control={<Checkbox defaultChecked={isAvailable} name="isAvailable" />}
          label="Available"
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "#664343", width: "fit-content" }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
