import React from "react";
import { Card, CardContent, Typography, Chip, CardMedia } from "@mui/material";
import { Box } from "@mui/material";
import Link from "next/link";

import { Menu } from "@prisma/client";

interface Props {
  menu: Menu;
}

function MenuCard({ menu }: Props) {
  return (
    <Link
      href={`/backoffice/menus/${menu.id}`}
      style={{ textDecoration: "none" }}
    >
      <Box p={4}>
        <Card
          sx={{
            width: 230,
            height: 260,
            pb: 2,
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={menu.assetUrl ? menu.assetUrl : ""}
            alt={menu.name}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {menu.name}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                Price: {menu.price}
              </Typography>
              <Chip
                label={menu.isAvailable ? "Available" : "Not Available"}
                sx={{
                  mt: 1,
                  color: "white",
                  backgroundColor: menu.isAvailable ? "green" : "red",
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}

export default MenuCard;
