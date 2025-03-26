"use client";

import { Box, Button, Typography } from "@mui/material";
import { Loactions } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  Location: Loactions[];
}

export default function LocationSignOut({ Location }: Props) {
  const [currentLocation, setCurrentLocation] = useState<Loactions>();

  /* useEffect run only when reach the client */
  useEffect(() => {
    const currentLocationId = localStorage.getItem("currentLocationId");
    if (!currentLocationId) {
      localStorage.setItem("currentLocationId", String(Location[0].id));
      /* Take first location */
      setCurrentLocation(Location[0]);
    } else {
      const currentLocation = Location.find(
        (item) => item.id === Number(currentLocationId)
      );
      setCurrentLocation(currentLocation);
    }
  }, [Location]);
  return (
    <>
      <Typography variant="h6">{currentLocation?.name}</Typography>

      <Button color="inherit" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );
}
