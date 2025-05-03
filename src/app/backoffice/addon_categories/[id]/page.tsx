import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import {
  DeleteUpdateAddonCategory,
  getMenuAndAddonCategory,
  UpDateAddonCategory,
} from "../action";

import { getCompanyMenus } from "@/app/utils/libs/actions";

interface props {
  params: {
    id: string;
  };
}

export default async function AddonCategoryUpdatePage({ params }: props) {
  const { id } = await params;
  const addonCategoryMenu = await getMenuAndAddonCategory(Number(id));
  if (!addonCategoryMenu) return null;

  const selected = addonCategoryMenu.menuAddonCategory.map(
    (item) => item.MenuId
  );

  const menus = await getCompanyMenus();
  return (
    <Box>
      {/* Delete */}
      <Box
        component={"form"}
        action={DeleteUpdateAddonCategory}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        {/* Title */}
        <Typography variant="h4">Update AddonCategory Page</Typography>
        <input value={id} type="hidden" name="Id"></input>
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
        action={UpDateAddonCategory}
      >
        <TextField
          defaultValue={addonCategoryMenu.name}
          name="updateName"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box>
          <Typography variant="h5" sx={{ my: 1 }}>
            Menus Name
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
            {menus.map((menu) => (
              <FormControlLabel
                key={menu.id}
                control={
                  <Checkbox
                    defaultChecked={selected.includes(menu.id)}
                    name="updateMenuCategoryId"
                    value={menu.id}
                  />
                }
                label={menu.name}
              />
            ))}
          </Box>
        </Box>

        <input value={id} type="hidden" name="updateAddonCategoryId" />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={addonCategoryMenu.isRequired ? true : false}
              name="isRequired"
            />
          }
          label="Is Required"
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
