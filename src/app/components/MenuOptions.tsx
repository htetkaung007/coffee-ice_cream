"use client";

import { Box, Button } from "@mui/material";
import { AddonCategoriesAndAddons } from "./AddonCategoriesAndAddons";
import { AddonCategories, Addons, Menu } from "@prisma/client";
import QuantitySelector from "./QuantitySelector";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddonType } from "./Addons";
import { MenuWithMenusAddonCategories } from "../order/menus/[id]/page";

interface Props {
  menu: MenuWithMenusAddonCategories;
  addonCategories: AddonCategories[];
  addons: Addons[];
  tableId: string;
  /* order?: OrdersWithOrderAddons | null; */
}

export default function MenuOptions({
  menu,
  addonCategories,
  addons,
  tableId,
}: /*  order, */
Props) {
  /* State */
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const requiredAddonCategories = addonCategories.filter(
      (item) => item.isRequired
    );
    const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === selectedAddon.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });
    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddons.length;
    setIsDisabled(isDisabled);
  }, [selectedAddons, addonCategories]);
  /* useEffect(() => {}, [order]); */
  /* Function */
  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };
  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };
  const handleCreateCartOrder = () => {};
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 10,
        px: 2,
        position: "relative",
        marginTop: { xs: 25, md: -5, lg: -22 },
      }}
    >
      {/* For AddonCategories and Addons */}
      <AddonCategoriesAndAddons
        addonCategories={addonCategories}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
        addons={addons}
      />
      <QuantitySelector
        value={quantity}
        onDecrease={handleQuantityDecrease}
        onIncrease={handleQuantityIncrease}
      />
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={handleCreateCartOrder}
        sx={{ width: "fit-content", mt: 2 }}
      >
        Add to cart
      </Button>
    </Box>
  );
}
