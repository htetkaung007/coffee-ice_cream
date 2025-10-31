"use server";
import { getSelectedLocationTables } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getTableTotalPriceByOrderId(orderId: number) {
  const order = await prisma.orders.findFirst({
    where: { id: orderId },
    include: {
      OrdersAddons: true,
      menu: true,
    },
  });
  if (!order) {
    return 0; // or throw an error if you prefer
  }
  const addonIds = order.OrdersAddons.map((addon) => addon.addonId);
  const addons = await prisma.addons.findMany({
    where: { id: { in: addonIds } },
  });

  let totalPrice = order.menu.price * order.quantity;
  if (addons.length) {
    for (const addon of addons) {
      totalPrice += addon.price;
    }
  }
  return totalPrice;
}

export async function updateOrderStatus(orderId: number, status: ORDERSTATUS) {
  await prisma.orders.update({
    where: { id: orderId },
    data: { status },
  });
}

export async function getTotalPriceForEachTable(tableId: number) {
  const orders = await prisma.orders.findMany({
    where: { tableId: tableId, status: { not: "PAIDED" } },
    include: { OrdersAddons: true, menu: true },
  });
  if (!orders.length) return 0;
  let totalPrice = 0;
  for (const order of orders) {
    totalPrice += order.menu.price * order.quantity;
    const orderAddons = order.OrdersAddons;
    for (const orderAddon of orderAddons) {
      const addonId = orderAddon.addonId;
      const addon = await prisma.addons.findUnique({
        where: { id: addonId },
      });
      if (addon) {
        totalPrice += addon.price * order.quantity;
      }
    }
  }
  return totalPrice;
}

export async function paidedPrice(Form: FormData) {
  const tableId = Form.get("tableId");
  if (!tableId) return;
  try {
    const orders = await prisma.orders.findMany({
      where: { tableId: Number(tableId), status: { not: "PAIDED" } },
    });
    if (!orders.length) return;
    for (const order of orders) {
      await prisma.orders.updateMany({
        where: { id: order.id },
        data: { status: ORDERSTATUS.PAIDED },
      });
    }
  } catch (error) {}

  revalidatePath("/backoffice/order");
}
