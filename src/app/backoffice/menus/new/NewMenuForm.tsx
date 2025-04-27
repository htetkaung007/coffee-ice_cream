"use client";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CreateMenu } from "../action";

import { MenuCategory } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "zod";
import { upload } from "@vercel/blob/client";

interface Props {
  menuCategories: MenuCategory[];
}

const NewMenu = ({ menuCategories }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //client side upload image to vercel blob
  const handleCreateMenuClient = async (formData: FormData) => {
    try {
      setLoading(true);
      const file = formData.get("file") as File;
      if (file.size > 0) {
        //take key and direct upload image to vercel blob
        const { url } = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        formData.set("imageUrl", url);
      }
      const response = await CreateMenu(formData);
      if (response?.error) {
        toast.error(response?.error);
      } else {
        toast.success("Menu Created Successfully");
        router.push("/backoffice/menus");
      }
    } catch (e) {
      setLoading(false);
    }
  };
  //server side upoload
  const handleCreateMenuServer = async (formData: FormData) => {
    setLoading(true);
    const response = await CreateMenu(formData);
    if (response?.error) {
      toast.error(response?.error);
    } else {
      toast.success("Menu Created Successfully");
      setTimeout(() => {
        router.push("/backoffice/menus");
      }, 2000);
    }
    setLoading(false);
  };
  return (
    <Box
      component={"form"}
      sx={{ display: "flex", flexDirection: "column" }}
      /* only use in client component */
      action={handleCreateMenuClient}
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
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#664343", width: "fit-content", mt: 2 }}
          >
            Create
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default NewMenu;
