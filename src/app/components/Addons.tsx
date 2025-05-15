import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { AddonCategories, Addons, Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type AddonType = Prisma.AddonsGetPayload<{
  include: { addonCategory: true };
}>;

interface Props {
  addonCategory: AddonCategories;
  addonCategoryAddons: Addons[];
  selectedAddons: Addons[];
  setSelectedAddons: Dispatch<SetStateAction<Addons[]>>;
}

export default function Addon({
  addonCategory,
  addonCategoryAddons,
  selectedAddons,
  setSelectedAddons,
}: Props) {
  if (!addonCategory) return null;
  console.log("setAddons", selectedAddons);
  return (
    <Box>
      {addonCategoryAddons.map((addonCategoryAddon) => {
        return (
          <Box
            key={addonCategoryAddon.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                addonCategory.isRequired ? (
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                    //When use cart
                    checked={
                      selectedAddons.find(
                        (item) => item.id === addonCategoryAddon.id
                      )
                        ? true
                        : false
                    }
                    onChange={() => {
                      //other selected
                      const addonIds = addonCategoryAddons.map(
                        (item) => item.id
                      );
                      console.log("addon", addonIds);
                      //[1.2.3] addonsIds Array
                      //take no include id
                      const other = selectedAddons.filter(
                        (selectedAddon) => !addonIds.includes(selectedAddon.id)
                      );
                      console.log("other", other);
                      //only one radio button
                      setSelectedAddons([...other, addonCategoryAddon]);
                    }}
                  ></Radio>
                ) : (
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                    checked={
                      selectedAddons.find(
                        (item) => item.id === addonCategoryAddon.id
                      )
                        ? true
                        : false
                    }
                    onChange={(event, value) => {
                      if (value) {
                        setSelectedAddons([
                          ...selectedAddons,
                          addonCategoryAddon,
                        ]);
                      } else {
                        const selected = selectedAddons.filter(
                          (item) => item.id !== addonCategoryAddon.id
                        );
                        setSelectedAddons(selected);
                      }
                    }}
                  ></Checkbox>
                )
              }
              label={addonCategoryAddon.name}
            ></FormControlLabel>
            <Typography sx={{ fontStyle: "initial" }}>
              {addonCategoryAddon.price}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
