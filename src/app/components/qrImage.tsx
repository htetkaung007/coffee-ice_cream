"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";

interface Props {
  qrImageUrl: string;
}

export default function QRImage({ qrImageUrl }: Props) {
  const handleQrImagePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              @page { size: auto; margin: 0mm; }
             body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                
                margin: 0;
                font-family: Arial, sans-serif;
              }
               h1 {
                font-size: 36px;
                margin-bottom: 30px;
                text-align: center;
                color: #000;
              }
              .qr-container {
                width: 80%;
                max-width: 700px;
                display: flex;
                justify-content: center;
              }  
                  img {
                width: 50%;
                height: auto;
                border: 2px solid #eee;
              }
            </style>
          </head>
          <body>
             <h1>Table QR Code</h1>
            <div class="qr-container">
              <img src="${qrImageUrl}" alt="Table QR Code" onload="window.print();" />
            </div>
            <h1>Scan This QrCode</h1>
          </body>
        </html>
      `);
      printWindow.document.close();

      // Fallback in case onload doesn't work
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image src={qrImageUrl} width={150} height={150} alt="qr-image" />
      <Button variant="contained" sx={{ my: 2 }} onClick={handleQrImagePrint}>
        Print
      </Button>
    </Box>
  );
}
