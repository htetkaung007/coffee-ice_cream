"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Loactions } from "@prisma/client";

interface Props {
  id: string;
  locations: Loactions[];
}

export default function LocationCheckbox({ id, locations }: Props) {
  const isCurrentLocationId = localStorage.getItem("currentLocationId");

  return (
    <FormControlLabel
      control={
        <Checkbox
          name="updateLocaationId"
          defaultChecked={id === isCurrentLocationId ? true : false}
          onChange={(_, checked) => {
            if (checked) {
              localStorage.setItem("currentLocationId", id);
            } else {
              /* Note This is not a good way */
              localStorage.setItem(
                "currentLocationId",
                String(locations[0].id)
              );
            }
          }}
        />
      }
      label={"Current Location"}
    />
  );
}
