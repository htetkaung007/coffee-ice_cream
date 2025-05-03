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
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
interface Props {
  menuCategories: MenuCategory[];
}

const NewMenu = ({ menuCategories }: Props) => {
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();
  //client side upload image to vercel blob
  const handleCreateMenuClient = async (formData: FormData) => {
    try {
      setLoading(true);
      // 👇 manually get file and append it to formData
      if (selectedFile && selectedFile.size > 0) {
        const { url } = await upload(selectedFile.name, selectedFile, {
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

  const VisuallyHiddenInput = styled("input")({
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file); // Save the file into state

      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);

      setFileSelected(true);
    } else {
      setFileSelected(false);
      setSelectedFile(null); // Clear state if no file
    }
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
      {/* Image State */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {imageUrl && (
          <Image
            onClick={() => {
              setImageUrl(null);
              setFileSelected(false);
            }}
            src={imageUrl}
            alt="Menu Image"
            width={190}
            height={170}
            style={{
              borderRadius: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              objectFit: "fill",
            }}
          />
        )}
        {fileSelected ? (
          <Box sx={{ color: "green", my: "5px", fontSize: "14px" }}>
            The new image is selected
          </Box>
        ) : (
          <Box sx={{ color: "green", my: "5px", fontSize: "14px" }}>
            You can upload a new image
          </Box>
        )}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ width: "fit-content", bgcolor: "green", mb: 2 }}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            name="file"
            multiple
            onChange={handleFileChange}
          />
        </Button>
      </Box>

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
