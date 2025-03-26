"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

import { CreateTable } from "../action";
import { useRef } from "react";
export default function CreateTables() {
  /* how to back this component from the DOM so we use useRef()  hook */
  const ref = useRef<HTMLFormElement | null>(null);
  /* Use this can call external API or can call another server */
  const handleCreateTable = (event: any) => {
    event.preventDefault();
    if (!ref.current) return;
    const fd = new FormData(ref.current);
    const locationId = localStorage.getItem("currentLocationId") as string;

    fd.set("locationId", locationId);
    CreateTable(fd);
  };

  return (
    <Box
      ref={ref}
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={CreateTable}
    >
      <TextField defaultValue={""} name="name" label="Addon Table"></TextField>

      <FormControlLabel
        control={<Checkbox defaultChecked name="isAvailable" />}
        label="Available"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleCreateTable}
          variant="contained"
          sx={{ bgcolor: "#664343", width: "fit-content", mt: 2 }}
        >
          Create Table
        </Button>
      </Box>
    </Box>
  );
}
