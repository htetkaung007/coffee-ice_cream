"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";

export default function BeverageOrderMUI() {
  const [selectedFlavor, setSelectedFlavor] = useState("strawberry");
  const [quantity, setQuantity] = useState(1);

  const handleFlavorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFlavor(event.target.value);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ef4444",
        padding: "16px",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          height: "64px",
          backgroundColor: "#dc2626",
          borderRadius: "8px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Beverage Order
        </Typography>
      </Box>

      {/* Main Content Box */}
      <Box
        sx={{
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            position: "relative",
            marginBottom: "24px",
          }}
        >
          <Image
            src="/strawberry-drink.png"
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

        {/* Flavor Selection */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1f2937",
              marginBottom: "12px",
              display: "block",
            }}
          >
            Flavor{" "}
            <Typography
              component="span"
              sx={{
                color: "#ef4444",
              }}
            >
              Required
            </Typography>
          </Typography>

          <RadioGroup
            value={selectedFlavor}
            onChange={handleFlavorChange}
            sx={{
              "& .MuiFormControlLabel-root": {
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 0,
                marginRight: 0,
                marginBottom: "12px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="strawberry"
                control={<Radio />}
                label="Strawberry"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#374151",
                  },
                }}
              />
              <Typography sx={{ color: "#6b7280" }}>0</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="blueberry"
                control={<Radio />}
                label="Blueberry"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#374151",
                  },
                }}
              />
              <Typography sx={{ color: "#6b7280" }}>0</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="kiwi"
                control={<Radio />}
                label="KiWi"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#374151",
                  },
                }}
              />
              <Typography sx={{ color: "#6b7280" }}>0</Typography>
            </Box>
          </RadioGroup>
        </Box>

        {/* Quantity Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <IconButton
            onClick={handleQuantityDecrease}
            sx={{
              backgroundColor: "#3b82f6",
              color: "white",
              width: "48px",
              height: "48px",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
          >
            <Remove />
          </IconButton>

          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#1f2937",
              minWidth: "32px",
              textAlign: "center",
            }}
          >
            {quantity}
          </Typography>

          <IconButton
            onClick={handleQuantityIncrease}
            sx={{
              backgroundColor: "#3b82f6",
              color: "white",
              width: "48px",
              height: "48px",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
          >
            <Add />
          </IconButton>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ef4444",
            color: "white",
            padding: "12px",
            fontSize: "18px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#dc2626",
            },
          }}
          onClick={() => {
            console.log(`Added ${quantity} ${selectedFlavor} drink(s) to cart`);
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
}
