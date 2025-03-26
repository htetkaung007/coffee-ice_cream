import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { CreateAddons } from "../action";
import { prisma } from "@/app/utils/prisma";
import { getCompanyAddonCategories } from "@/app/utils/libs/actions";

const createMenu = async () => {
  const AddonCategories = await getCompanyAddonCategories();

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateAddons}
    >
      <TextField defaultValue={""} name="name" label="Addon Name"></TextField>
      <TextField
        defaultValue={""}
        name="price"
        type="number"
        sx={{ mt: 2 }}
        label="Price"
      ></TextField>
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
          {AddonCategories.map((AddonCategory) => (
            <FormControlLabel
              key={AddonCategory.id}
              control={
                <Checkbox name="addonCategory" value={AddonCategory.id} />
              }
              label={AddonCategory.name}
            />
          ))}
        </Box>
      </Box>

      <FormControlLabel
        control={<Checkbox defaultChecked name="isAvailable" />}
        label="Available"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#664343", width: "fit-content", mt: 2 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
export default createMenu;
