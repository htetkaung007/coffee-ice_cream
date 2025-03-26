import { Box, Button, TextField, Typography } from "@mui/material";

import { DeleteLocations, getLocation, UpDateLocation } from "../action";

import { redirect } from "next/navigation";
import LocationCheckbox from "@/app/components/LocationCheckbox";
import { getCompanyLocations } from "@/app/utils/libs/actions";

interface props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: props) {
  const { id } = await params;
  const locations = await getLocation(Number(id));
  const location = await getCompanyLocations();
  if (!locations) {
    redirect("/backoffice/locations?error=Location Id is not found");
  }

  return (
    <Box>
      {/* Delete */}
      <Box
        action={DeleteLocations}
        component={"form"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        {/* Title */}
        <Typography variant="h4">Update Location Page</Typography>
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
        action={UpDateLocation}
      >
        <TextField
          defaultValue={locations.name}
          name="name"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <LocationCheckbox id={id} locations={location} />
        <input value={id} type="hidden" name="updateId" />
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
