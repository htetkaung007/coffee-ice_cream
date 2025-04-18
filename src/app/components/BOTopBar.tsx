import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import {
  getCompanyLocations,
  getSelectedLocations,
} from "../utils/libs/actions";
import LocationSignOut from "./LocationSignOut";
import { prisma } from "../utils/prisma";
import { getCompany } from "../backoffice/setting/action";

const TopBar = async () => {
  const locations = await getCompanyLocations();
  const currentLocation = (await getSelectedLocations())?.locationId;
  const location = locations.find((item) => item.id === currentLocation);
  const company = await getCompany();

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
                  {company?.name}
                </Typography>
              </Box>
              <Typography variant="h6">{location?.name}</Typography>
              <LocationSignOut />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};
export default TopBar;
