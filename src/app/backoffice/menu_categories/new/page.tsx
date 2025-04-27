"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { CreateMenuCategory } from "../action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddMenuCategory = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreateMenuCatergory = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await CreateMenuCategory(formData);
      if (response?.error) {
        toast.error(response?.error);
      } else {
        toast.success("MenuCategory Created Successfully");
        router.push("/backoffice/menu_categories");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      action={handleCreateMenuCatergory}
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
