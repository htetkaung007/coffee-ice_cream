import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CreateMenu } from "../action";
import { getCompanyMenuCategories } from "@/app/utils/libs/actions";

const createMenu = async () => {
  const menuCategories = await getCompanyMenuCategories();

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateMenu}
    >
      <TextField defaultValue={""} name="menu" label="Menu Name"></TextField>
      <TextField
        defaultValue={""}
        name="price"
        type="number"
        sx={{ mt: 2 }}
        label="Price"
      ></TextField>
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
                <Checkbox name="menuCategories" value={menuCategory.id} />
              }
              /* give value menuCategory id for check which menuCategory is click */
              label={menuCategory.name}
            />
          ))}
        </Box>
      </Box>
      <TextField type="file" name="file" sx={{ mt: 2 }} />
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
