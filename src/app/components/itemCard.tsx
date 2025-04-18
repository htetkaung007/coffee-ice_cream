"use client";
import { Box, Chip, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  href?: string;
  subtitle?: string;
  isAvailable?: boolean;
}

const ItemCard = ({ icon, title, href, subtitle, isAvailable }: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
        <Paper
          elevation={2}
          sx={{
            minWidth: "120px",
            width: "auto-fit",
            height: 150,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            m: 2,
          }}
        >
          {icon}

          <Typography
            sx={{
              color: "#4C4C6D",
              fontWeight: "700",
              mt: 2,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography sx={{ color: "#4C4C6D", fontSize: 14 }}>
              {subtitle}
            </Typography>
          )}
        </Paper>
      </Link>
    );
  } else {
    <Box>
      <Paper
        elevation={2}
        sx={{
          minWidth: "120px",
          width: "auto-fit",
          height: 150,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
        }}
      >
        {icon}

        <Typography
          sx={{
            color: "#4C4C6D",
            fontWeight: "700",
            mt: 2,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: "#4C4C6D", fontSize: 14 }}>
            {subtitle}
          </Typography>
        )}
      </Paper>
    </Box>;
  }
};

export default ItemCard;
