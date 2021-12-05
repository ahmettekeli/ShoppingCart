import { CartItemInterface } from "../interfaces";

export async function getProducts(url: string): Promise<CartItemInterface[]> {
  const response = await fetch(url);
  return await response.json();
}

export function getTotalItemCount(items: CartItemInterface[]): number {
  return items.reduce((ack, item) => ack + item.amount, 0);
}
