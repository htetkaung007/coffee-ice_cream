import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { CreateAddonCategory } from "../action";
import { getCompanyMenus } from "@/app/utils/libs/actions";

const createAddonCategory = async () => {
  const menus = await getCompanyMenus();
  if (!menus) return null;
  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateAddonCategory}
    >
      <TextField
        defaultValue={""}
        name="name"
        label="Addon Category Name"
      ></TextField>
      <Box>
        <Typography variant="h5" sx={{ my: 1 }}>
          Menu Name
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
              control={<Checkbox name="menuIds" value={menu.id} />}
              label={menu.name}
            />
          ))}
        </Box>
      </Box>
      <FormControlLabel
        control={<Checkbox defaultChecked name="isRequired" />}
        label="Is Required"
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
export default createAddonCategory;
