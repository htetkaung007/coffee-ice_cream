"use client";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { MenuCategoryType, MenuType } from "../order/page";
import MenuCard from "./MenuCard";

interface Props {
  menuCategories: MenuCategoryType[];
  menus: MenuType[];
  tableId: number;
}

const MenuCategoriesTabs = ({ menuCategories, menus, tableId }: Props) => {
  const [menusToShow, setMenusToSHow] = useState<MenuType[]>([]);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategoryType>(menuCategories[0]);

  useEffect(() => {
    const menuIds = selectedMenuCategory.menuMenuCategory.map(
      (item) => item.menuId
    );
    const tabMenusToShow = menus.filter((menu) => menuIds.includes(menu.id));
    setMenusToSHow(tabMenusToShow);
    console.log("mento sho", menus);
  }, [selectedMenuCategory]);

  return (
    <Box
      sx={{
        position: "relative",
        top: { md: -60, lg: -110 },
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <Tabs
        TabIndicatorProps={{ style: { background: "#2A9D8F" } }}
        value={value} //notice that this is the value of the selected tab
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        variant="scrollable"
        sx={{
          pb: 1,
          "& .MuiTab-root.Mui-selected": { color: "blue", fontWeight: "blod" },
        }}
      >
        {menuCategories.map((menuCategory, index) => (
          <Tab
            key={index}
            label={menuCategory.name}
            onClick={() => {
              setSelectedMenuCategory(menuCategory);
            }}
            sx={{
              color: "#264653",
              fontWeight: "bold",
              "&.Mui-selected": {
                color: "#2A9D8F",
                fontWeight: "bold",
              },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menusToShow.map((menu) => (
          <MenuCard
            key={menu.id}
            name={menu.name}
            price={menu.price}
            href={`/order/menus/${menu.id}?tableId=${tableId}`}
            imageUrl={menu.assetUrl as string}
          ></MenuCard>
        ))}
      </Box>
    </Box>
  );
};
export default MenuCategoriesTabs;
