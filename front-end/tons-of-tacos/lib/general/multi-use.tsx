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

export function calcItemTotal(
  basePrice: number,
  oldSize: string,
  newSize: string,
  newQuantity: number
) {
  let adjPrice = 0;
  let surcharge = 0;
  let oldSurcharge = 0;

  if (oldSize === "M") {
    oldSurcharge = 0.5;
  } else if (oldSize === "L") {
    oldSurcharge = 1;
  }

  if (newSize === "M") {
    surcharge = 0.5;
  } else if (newSize === "L") {
    surcharge = 1;
  }

  adjPrice = (basePrice - oldSurcharge + surcharge) * newQuantity;

  return adjPrice;
}

export function formatPhone(input: string) {
  if (!input) return input;
  const numberInput: string = input.replace(/[^\d]/g, "");
  const inputLength: number = numberInput.length;

  if (inputLength < 4) {
    return numberInput;
  } else if (inputLength < 7) {
    return `${numberInput.slice(0, 3)}.${numberInput.slice(3)}`;
  } else {
    return `${numberInput.slice(0, 3)}.${numberInput.slice(
      3,
      6
    )}.${numberInput.slice(6)}`;
  }
}
