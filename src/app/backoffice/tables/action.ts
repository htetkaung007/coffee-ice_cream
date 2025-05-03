"use server";
import { config } from "@/app/utils/config";
/* If the export key  */
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { put } from "@vercel/blob";
import { Tabels } from "@prisma/client";

export const getTable = async (id: number) => {
  return await prisma.tabels.findFirst({
    where: { id },
  });
};
/* Update */
export const UpDateTable = async (formData: FormData) => {
  const name = formData.get("name") as string;

  const updateId = formData.get("updateId");

  await prisma.tabels.update({
    data: {
      name,
    },
    where: {
      id: Number(updateId),
    },
  });

  redirect("/backoffice/tables");
};
/* Create  */
export const CreateTable = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));

  const table = await prisma.tabels.create({
    data: {
      name,
      locationId,
      qrcodeImageUrl: "",
    },
  });
  const url = await createQRCodeUrl(table);
  await prisma.tabels.update({
    data: { ...table, qrcodeImageUrl: url },
    where: { id: table.id },
  });
  //qr --> upload --> url --> add Table url
  redirect("/backoffice/tables");
};

export const DeleteUpdteTable = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await prisma.tabels.update({
    where: { id },
    data: { isArchived: true },
  });

  redirect("/backoffice/tables");
};

export const createQRCodeUrl = async (table: Tabels) => {
  const orderAppUrl = config.orderAppUrl;
  const tableUrl = `${orderAppUrl}?tableId=${table.id}`;
  const qrCodeImage = await QRCode.toBuffer(tableUrl, { scale: 8 });
  const { url } = await put(
    `coffee&IceCream/Table-${table.id}.png`,
    qrCodeImage,
    {
      access: "public",
      allowOverwrite: true,
    }
  );
  return url;
};
