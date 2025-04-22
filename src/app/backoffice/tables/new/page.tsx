import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

import { CreateTable } from "../action";
import { useRef } from "react";
import { get } from "http";
import { getSelectedLocations } from "@/app/utils/libs/actions";
export default async function CreateTables() {
  /* Need to know hook */
  /* how to back this component from the DOM so we use useRef()  hook */
  /*  const ref = useRef<HTMLFormElement | null>(null); */
  /* Use this can call external API or can call another server */
  /*   const handleCreateTable = (event: any) => {
    event.preventDefault();
    if (!ref.current) return;
    const fd = new FormData(ref.current);
    const locationId = localStorage.getItem("currentLocationId") as string;

    fd.set("locationId", locationId);
    CreateTable(fd);
  }; */
  const currentLocationId = (await getSelectedLocations())?.locationId;
  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateTable}
    >
      <TextField defaultValue={""} name="name" label="Addon Table"></TextField>
      <input value={currentLocationId} type="hidden" name="locationId"></input>
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
          Create Table
        </Button>
      </Box>
    </Box>
  );
}
