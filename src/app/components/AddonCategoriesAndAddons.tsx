import { Box, Chip, Typography } from "@mui/material";
import { AddonCategories, Addons, Menu } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { AddonType } from "./Addons";
import Addon from "./Addons";

interface Props {
  addonCategories: AddonCategories[];
  addons: Addons[];
  selectedAddons: Addons[];
  setSelectedAddons: Dispatch<SetStateAction<Addons[]>>;
}

export function AddonCategoriesAndAddons({
  addonCategories,
  addons,
  selectedAddons,
  setSelectedAddons,
}: Props) {
  return (
    <Box sx={{ width: "90%" }}>
      {/* Seprate AddonCategory and their're addons */}

      {addonCategories.map((addonCategory) => {
        //talke all addons[] relative with addoncategories[]
        const addonCategoryAddons = addons.filter(
          (addon) => addon.addonCategoryId === addonCategory.id
        );
        return (
          //Show AddonCategory Title and Is Requried or not
          <Box key={addonCategory.id} sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ userSelect: "none" }}>
                {addonCategory.name}
              </Typography>
              <Chip
                sx={{ color: addonCategory.isRequired ? "red" : "Black" }}
                label={addonCategory.isRequired ? "Required" : "Optional"}
              />
            </Box>
            {/* For Their Relative Addons */}
            <Box
              sx={{
                pl: 1,
                mt: 1,

                borderRadius: 1,
                py: 0.5,
              }}
            >
              <Addon
                addonCategory={addonCategory}
                addonCategoryAddons={addonCategoryAddons}
                selectedAddons={selectedAddons}
                setSelectedAddons={setSelectedAddons}
              ></Addon>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
