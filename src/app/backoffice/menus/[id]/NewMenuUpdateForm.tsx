"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CreateMenu, DeleteUpdateMenu, UpDateMenu } from "../action";

import { Menu, MenuCategory } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { upload } from "@vercel/blob/client";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
interface Props {
  menu: Menu;
  menuCategories: MenuCategory[];
  selected: number[];
  isAvailable: boolean;
}

const UpdateMenuPage = ({
  menuCategories,
  menu,
  selected,
  isAvailable,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  //client side upload image to vercel blob
  const handleUpadateMenuClient = async (formData: FormData) => {
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
      const response = await UpDateMenu(formData);
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

  const HandleDeleteUpdateMenu = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await DeleteUpdateMenu(formData);
      if (response?.error) {
        response.error.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        toast.success("Menu Deleted Successfully");
        router.push("/backoffice/menus");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
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
    <Box>
      {/* Delete */}
      <Box
        action={HandleDeleteUpdateMenu}
        component={"form"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        {/* Title */}
        <Typography variant="h4">Update Menu Page</Typography>

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
        action={handleUpadateMenuClient}
      >
        <TextField
          defaultValue={menu.name}
          name="updateMenuName"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          defaultValue={menu.price}
          name="UpdatePrice"
          variant="outlined"
          sx={{ mb: 2 }}
        />
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
                  <Checkbox
                    defaultChecked={selected.includes(menuCategory.id)}
                    name="updateMenuCategoryIds"
                    value={menuCategory.id}
                  />
                }
                label={menuCategory.name}
              />
            ))}
          </Box>
        </Box>
        {/* Image State */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Image
            onClick={() => {
              setImageUrl(null);
              setFileSelected(false);
            }}
            src={imageUrl ? imageUrl : menu.assetUrl || ""}
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
          control={<Checkbox defaultChecked={isAvailable} name="isAvailable" />}
          label="Available"
        />
        <input value={menu.id} type="hidden" name="updateMenuId" />
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
};
export default UpdateMenuPage;
