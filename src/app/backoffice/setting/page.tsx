import { Box, Button, TextField } from "@mui/material";
import { getCompany, updateCompany } from "./action";

export default async function UpdateCompanyPage() {
  const company = await getCompany();
  return (
    <Box>
      <Box
        component={"form"}
        action={updateCompany}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField defaultValue={company?.name} name="name" />
        <input type="hidden" name="id" defaultValue={company?.id} />
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#664343" }}>
            Update Company
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
