"use server";
import { prisma } from "@/app/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";

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
