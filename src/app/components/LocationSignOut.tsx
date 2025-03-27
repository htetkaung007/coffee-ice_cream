"use client";

import { Box, Button, Typography } from "@mui/material";
import { Loactions } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  Location: Loactions;
}

export default function LocationSignOut() {
  return (
    <>
      <Button color="inherit" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );
}
