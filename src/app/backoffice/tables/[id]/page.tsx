import { Box, Button, TextField, Typography } from "@mui/material";

import { DeleteUpdteTable, getTable, UpDateTable } from "../action";

import { redirect } from "next/navigation";
import QRImage from "@/app/components/qrImage";

interface props {
  params: {
    id: string;
  };
}

export default async function MenuUpdatePage({ params }: props) {
  const { id } = await params;
  const table = await getTable(Number(id));
  if (!table) {
    redirect("/backoffice/tables?error=Table Id is not found");
  }

  return (
    <Box>
      {/* Delete */}
      <Box
        action={DeleteUpdteTable}
        component={"form"}
        sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
      >
        {/* Title */}
        <Typography variant="h4">Update Page : {table.name}</Typography>
        <input value={id} type="hidden" name="id"></input>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          color="error"
        >
          Delete
        </Button>
      </Box>
      <QRImage qrImageUrl={table.qrcodeImageUrl as string} />
      {/* Update*/}
      <Box
        component={"form"}
        sx={{ display: "flex", flexDirection: "column" }}
        action={UpDateTable}
      >
        <TextField
          defaultValue={table.name}
          name="name"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <input value={id} type="hidden" name="updateId" />

        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "#664343", width: "fit-content" }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
