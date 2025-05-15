import { Box, Chip, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
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
    <Box sx={{ width: "100%" }}>
      {/* Seprate AddonCategory and their're addons */}
      {addonCategories.map((addonCategory) => {
        //talke all addons[] relative with addoncategories[]
        const addonCategoryAddons = addons.filter(
          (addon) => addon.addonCategoryId === addonCategory.id
        );
        return (
          //Show AddonCategory Title and Is Requried or not
          <Box key={addonCategory.id} sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ userSelect: "none" }}>
                {addonCategory.name}
              </Typography>
              <Chip
                label={addonCategory.isRequired ? "Required" : "Optional"}
              />
            </Box>
            {/* For Their Relative Addons */}
            <Box sx={{ pl: 1, mt: 2 }}>
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
