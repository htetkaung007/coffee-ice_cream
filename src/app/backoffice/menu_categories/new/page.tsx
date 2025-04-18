import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { CreateMenuCategory } from "../action";

const AddMenuCategory = () => {
  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateMenuCategory}
    >
      <TextField
        defaultValue={""}
        name="menuCategory"
        label="Add MenuCategory Name"
      ></TextField>
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
export default AddMenuCategory;
