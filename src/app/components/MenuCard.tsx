"use client";
import React from "react";
import { Card, CardContent, Typography, Chip, CardMedia } from "@mui/material";
import { Box } from "@mui/material";
import Link from "next/link";

interface Props {
  name: string;
  price: number;
  imageUrl?: string;
  href: string;
  showIsAvailable?: boolean;
  isAvailable?: boolean;
}

function MenuCard({
  name,
  price,
  imageUrl,
  href,
  isAvailable,
  showIsAvailable,
}: Props) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
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
            image={imageUrl ? imageUrl : ""}
            alt={name}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body1" color="text.secondary">
                Price: {price}
              </Typography>
              {showIsAvailable && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    ml: 10,
                  }}
                >
                  <Chip
                    label={isAvailable ? "Available" : "Not Available"}
                    sx={{
                      mt: 1,
                      color: "white",
                      backgroundColor: isAvailable ? "green" : "red",
                    }}
                  />
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}

export default MenuCard;
