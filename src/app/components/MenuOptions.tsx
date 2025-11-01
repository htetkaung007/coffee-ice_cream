"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
import { AddonCategoriesAndAddons } from "./AddonCategoriesAndAddons";
import {
  AddonCategories,
  Addons,
  Menu,
  Orders,
  OrdersAddons,
} from "@prisma/client";
import QuantitySelector from "./QuantitySelector";
import { useEffect, useState } from "react";

import { MenuWithMenusAddonCategories } from "../order/menus/[id]/page";
import { createCartOrder } from "../order/cart/action";

import Image from "next/image";
import React from "react";

export interface OrdersWithOrderAddons extends Orders {
  OrdersAddons: OrdersAddons[];
}

interface Props {
  menu: MenuWithMenusAddonCategories;
  addonCategories: AddonCategories[];
  addons: Addons[];
  tableId: string;
  order: OrdersWithOrderAddons | null;
}
export const formatPriceClient = (price: number): string => {
  return price.toLocaleString("en-US");
};
export default function MenuOptions({
  menu,
  addonCategories,
  addons,
  tableId,
  order,
}: Props) {
  /* State */
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

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

  useEffect(() => {
    if (order) {
      const orderAddonIds = order.OrdersAddons.map((item) => item.addonId);
      const orderAddons = addons.filter((item) =>
        orderAddonIds.includes(item.id)
      );
      setSelectedAddons(orderAddons);
      setQuantity(order.quantity);
    }
  }, [order]);

  /* Function */
  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };
  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };
  const handleCreateCartOrder = async () => {
    const response = await createCartOrder({
      menuId: menu.id,
      addonIds: selectedAddons.map((item) => item.id),
      quantity,
      tableId: Number(tableId),
      orderId: order?.id || undefined,
    });

    /*  router.push("/order/cart?tableId=" + tableId); */
    /* if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu added to cart");
      
    } */
  };
  return (
    <Box
      sx={{
        maxWidth: 350,

        maxHeight: "fit-content",

        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 10,
        px: 2,
        position: "relative",
        marginTop: { xs: 2, md: -5, lg: -20 },
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Photo */}
      <Box
        sx={{
          position: "relative",
          marginBottom: "24px",
        }}
      >
        <Image
          src={`${menu.assetUrl}`}
          alt="Strawberry drink with fresh strawberries"
          width={400}
          height={300}
          style={{
            width: "100%",
            height: "256px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Box>
      {/* For AddonCategories and Addons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ mb: 0.2 }}>
          {menu.name}
        </Typography>
        <Typography fontSize={18}>{formatPriceClient(menu.price)}</Typography>
      </Box>
      <Divider sx={{ width: "90%", mb: 2 }} />
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
        sx={{ width: "fit-content", mt: 1 }}
      >
        {order ? "Update Order" : "Add to Cart"}
      </Button>
    </Box>
  );
}
