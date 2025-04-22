import React from "react";
import { Typography, Box } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { MenuCategory } from "@prisma/client";
import Link from "next/link";
import { title } from "process";

interface Props {
  title: string;
  isAvailable: boolean;

  href: string;
}

// Flavor items array

const MenuCategoryCard = ({ title, href, isAvailable }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box
          sx={{
            minWidth: "120px",
            width: "auto-fit",
            height: 130,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
            opacity: isAvailable ? 1 : 0.5,
            borderRadius: 2,
            boxShadow: 2,
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
            backgroundColor: "white",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: 4,
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <RestaurantMenuIcon fontSize="small" />
          <Typography variant="caption" mt={0.5}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default MenuCategoryCard;
