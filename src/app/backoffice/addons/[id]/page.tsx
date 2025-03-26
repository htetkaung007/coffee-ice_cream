import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { DeleteAddon, getAddon, UpDateAddon } from "../action";
import { prisma } from "@/app/utils/prisma";
import { getCompanyAddonCategories } from "@/app/utils/libs/actions";

interface props {
  params: {
    id: string;
  };
}

export default async function AddonUpdatePage({ params }: props) {
  const { id } = await params;
  const addon = await getAddon(Number(id));
  if (!addon) return null;

  const addonCategories = await getCompanyAddonCategories();
  return (
    <Box>
      {/* Delete */}
      <Box
        action={DeleteAddon}
        component={"form"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        {/* Title */}
        <Typography variant="h4">Update Addon Page</Typography>
        <input value={id} type="hidden" name="id"></input>
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
        action={UpDateAddon}
      >
        <TextField
          defaultValue={addon.name}
          name="name"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          defaultValue={addon.price}
          name="price"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box>
          <Typography variant="h5" sx={{ my: 1 }}>
            AddonCategories Name
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
            {addonCategories.map((addonCategory) => (
              <FormControlLabel
                key={addonCategory.id}
                control={
                  <Checkbox
                    name="updateMenuCategoryId"
                    value={addonCategory.id}
                    checked={addonCategory.id === addon.addonCategoryId}
                  />
                }
                label={addonCategory.name}
              />
            ))}
          </Box>
        </Box>

        <input value={id} type="hidden" name="updateMenuId" />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={addon.isAvailable ? true : false}
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
