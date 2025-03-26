"use client";

import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SingnIn() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2">Welcome Back!</Typography>
      <Typography sx={{ textAlign: "center", mb: 5, maxWidth: 400 }}>
        Sign in to lyour4 account to access your backoffice and manage your
        menus
      </Typography>
      <Button
        sx={{ bgcolor: "blue", color: "white", "&:hover": { bgcolor: "gray" } }}
        variant="contained"
        onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
      >
        Sign in with google
      </Button>
    </Box>
  );
}
