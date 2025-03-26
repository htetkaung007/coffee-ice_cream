import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { getCompanyLocations } from "../utils/libs/actions";
import LocationSignOut from "./LocationSignOut";

const TopBar = async () => {
  const responseDataLocation = await getCompanyLocations();

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ bgcolor: "#3B3030" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Coffee & Ice-cream
                </Typography>
              </Box>
              <LocationSignOut Location={responseDataLocation} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};
export default TopBar;
