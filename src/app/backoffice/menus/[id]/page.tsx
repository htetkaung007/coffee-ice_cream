import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteMenu, getMenu, UpDateMenu } from "../action";
import { getCompanyMenuCategories } from "@/app/utils/libs/actions";

interface props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: props) {
  const { id } = await params;
  const menu = await getMenu(Number(id));
  if (!menu) return null;

  const selected = menu.menuMenuCategory.map((item) => item.menuCategoryId);

  const menuCategories = await getCompanyMenuCategories();
  return (
    <Box>
      {/* Delete */}
      <Box
        action={DeleteMenu}
        component={"form"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        {/* Title */}
        <Typography variant="h4">Update Menu Page</Typography>
        <input value={id} type="hidden" name="menuId"></input>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          color="error"
        >
          Delete
        </Button>
      </Box>
      {/* Update*/}
      <Box
        component={"form"}
        sx={{ display: "flex", flexDirection: "column" }}
        action={UpDateMenu}
      >
        <TextField
          defaultValue={menu?.name}
          name="updateMenuName"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          defaultValue={menu.price}
          name="UpdatePrice"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box>
          <Typography variant="h5" sx={{ my: 1 }}>
            MenuCategories
          </Typography>
          <Box
            sx={{
              display: "flex",
              border: "1px solid lightgray",
              px: 1.2,
              py: 1,
              borderRadius: 1,
            }}
          >
            {menuCategories.map((menuCategory) => (
              <FormControlLabel
                key={menuCategory.id}
                control={
                  <Checkbox
                    defaultChecked={selected.includes(menuCategory.id)}
                    name="updateMenuCategoryId"
                    value={menuCategory.id}
                  />
                }
                label={menuCategory.name}
              />
            ))}
          </Box>
        </Box>

        <input value={id} type="hidden" name="updateMenuId" />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={menu.isArchived ? true : false}
              name="isAvailable"
            />
          }
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
