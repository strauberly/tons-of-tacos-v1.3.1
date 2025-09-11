import { GetCart } from "../cart";
import { GetOwnerOrder } from "../owners-tools/owners-tools-client";

export function CalcOrderTotal(loggedIn: boolean) {
  let orderTotal = 0;
  let order: CartItem[];

  if (loggedIn) {
    order = GetOwnerOrder();
  } else {
    order = GetCart();
  }

  let i;
  for (i = 0; i < order.length; i++) {
    orderTotal += parseFloat(order[i].price);
  }
  console.log("owner order total: " + orderTotal.toFixed(2));
  return orderTotal.toFixed(2);
}
