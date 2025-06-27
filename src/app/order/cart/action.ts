"use server";
import { prisma } from "@/app/utils/prisma";
import { red } from "@mui/material/colors";
import { ORDERSTATUS } from "@prisma/client";
import { log } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface CreateCartOrderProps {
  menuId: number;
  quantity: number;
  tableId: number;
  addonIds?: number[];
  orderId?: number;
}
export async function createCartOrder({
  menuId,
  quantity,
  tableId,
  addonIds,
  orderId,
}: CreateCartOrderProps) {
  if (orderId) {
    //if orderId is provided, update the existing order
    await prisma.orders.update({
      where: { id: orderId },
      data: {
        quantity,

        status: ORDERSTATUS.CART,
      },
    });
    if (addonIds?.length) {
      //delete existing addons for this order
      await prisma.ordersAddons.deleteMany({
        where: { orderId },
      });
      //create new addons for this order
      for (const addonId of addonIds) {
        await prisma.ordersAddons.create({
          data: {
            orderId,
            addonId,
          },
        });
      }
    } else {
      //if no addons are provided, delete existing addons for this order
      await prisma.ordersAddons.deleteMany({
        where: { orderId },
      });
    }
    revalidatePath("/order/cart?tableId=" + tableId);
    redirect(`/order/cart?tableId=${tableId}`);
  }
  const order = await prisma.orders.create({
    data: {
      menuId,
      quantity,
      tableId,
    },
  });

  if (addonIds?.length) {
    //can't use createMany because of the foreign key constraint
    // so we need to create each record one by one
    for (const addonId of addonIds) {
      await prisma.ordersAddons.create({
        data: {
          orderId: order.id,
          addonId,
        },
      });
    }
  }

  revalidatePath("/order?tableId=" + tableId);
  redirect(`/order?tableId=${tableId}`);
}

//calculate the total price for one table
export async function getTableTotalPrice(
  tableId: number,
  status?: ORDERSTATUS
) {
  const cartOrders = await prisma.orders.findMany({
    where: { tableId, status: status ? status : ORDERSTATUS.CART },
    include: { menu: true, OrdersAddons: true },
  });
  if (!cartOrders.length) return 0;

  let totalPrice = 0;
  for (const cartOrder of cartOrders) {
    totalPrice += cartOrder.menu.price * cartOrder.quantity;
    const orderAddons = cartOrder.OrdersAddons;
    for (const orderAddon of orderAddons) {
      const addonId = orderAddon.addonId;
      const addon = await prisma.addons.findUnique({
        where: { id: addonId },
      });
      if (addon) {
        totalPrice += addon.price;
      }
    }
  }
  return totalPrice;
}

//delete cart order by order id
export async function deleteCartOrder(Form: FormData) {
  const id = Form.get("orderId");
  if (!id) return;
  try {
    const orderAddons = await prisma.ordersAddons.findMany({
      where: { orderId: Number(id) },
    });
    // If there are addons associated with the order, delete them first
    // This is necessary to avoid foreign key constraint errors
    // when deleting the order
    if (orderAddons.length) {
      await prisma.ordersAddons.deleteMany({
        where: { orderId: Number(id) },
      });
    }
    // Now delete the order itself
    await prisma.orders.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    log("Error deleting cart order:", error);
  }

  revalidatePath("/order/cart");
}
//confirm cart order
export async function confirmCartOrder(Form: FormData) {
  const tableId = Form.get("tableId");
  if (!tableId) return;
  try {
    const orders = await prisma.orders.findMany({
      where: { tableId: Number(tableId), status: ORDERSTATUS.CART },
    });
    if (!orders.length) return;
    for (const order of orders) {
      await prisma.orders.updateMany({
        where: { id: order.id, status: ORDERSTATUS.CART },
        data: { status: ORDERSTATUS.PENDING },
      });
    }
  } catch (error) {
    log("Error confirming cart order:", error);
  }

  revalidatePath("/order/cart");
  redirect(`/order/active-order?tableId=${tableId}`);
}
