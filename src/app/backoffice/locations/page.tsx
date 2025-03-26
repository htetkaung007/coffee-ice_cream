import ItemCard from "@/app/components/itemCard";

import { Box, Button } from "@mui/material";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getCompanyLocations } from "@/app/utils/libs/actions";
const locations = async () => {
  const locations = await getCompanyLocations();

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href={"/backoffice/locations/new"}>
          <Button variant="contained" sx={{ bgcolor: "#664343" }}>
            Add Locations
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {locations.map((item) => (
          <ItemCard
            key={item.id}
            icon={<LocationOnIcon />}
            title={item.name}
            href={`/backoffice/locations/${item.id}`}
          ></ItemCard>
        ))}
      </Box>
    </Box>
  );
};
export default locations;
