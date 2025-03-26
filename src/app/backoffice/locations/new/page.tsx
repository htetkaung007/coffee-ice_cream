import { Box, Button, TextField } from "@mui/material";

import { CreateLocations } from "../action";

const createLocation = async () => {
  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateLocations}
    >
      <TextField
        defaultValue={""}
        name="name"
        label="Addon Locations"
      ></TextField>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#664343", width: "fit-content", mt: 2 }}
        >
          Create Location
        </Button>
      </Box>
    </Box>
  );
};
export default createLocation;
