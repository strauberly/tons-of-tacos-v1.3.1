// export let OwnerOrderTotal = 0;

export function calcPrice(unitPrice: number, size: string, quantity: number) {
  let sizeSurcharge: number = 0.0;
  // let adjPrice: number;

  switch (size) {
    case "M":
      sizeSurcharge = 0.5;
      break;
    case "L":
      sizeSurcharge = 1.0;
  }
  const adjPrice = (unitPrice + sizeSurcharge) * quantity;
  return adjPrice;
}

export function CreateOwnerOrder() {
  const ownerCart: CartItem[] = [];
  if (!sessionStorage.getItem("owner-order")) {
    sessionStorage.setItem("owner-order", JSON.stringify(ownerCart));
  }
}

export function GetOwnerOrder() {
  let ownerCart: CartItem[] = [];

  try {
    ownerCart = JSON.parse(sessionStorage.getItem("owner-order") || "{}");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("whups...");
  }
  return ownerCart;
}

export function AddToOwnerOrder(
  id: string,
  menuId: string,
  itemName: string,
  quantity: number,
  size: string,
  price: string
) {
  const cartItem: CartItem = {
    id: id,
    menuId: menuId,
    itemName: itemName,
    quantity: quantity,
    size: size,
    price: Number(price).toFixed(2).toString(),
  };

  let newOwnerCart: CartItem[] = [];
  newOwnerCart = GetOwnerOrder();
  newOwnerCart.push(cartItem);
  sessionStorage.removeItem("owner-order");
  sessionStorage.setItem("owner-order", JSON.stringify(newOwnerCart));
}

export function RemoveFromOwnerOrder(id: string) {
  console.log(id);
  const updatedOrder = GetOwnerOrder().filter(
    (orderItem) => orderItem.menuId != id
  );
  // console.log(updatedOrder);
  sessionStorage.removeItem("owner-order");
  sessionStorage.setItem("owner-order", JSON.stringify(updatedOrder));
}

export function updateOwnerOrder(order: CartItem[]) {
  sessionStorage.removeItem("owner-order");
  sessionStorage.setItem("owner-order", JSON.stringify(order));
}

export function RemoveOwnerOrder() {
  sessionStorage.removeItem("owner-order");
}

export function CalcOrderTotal() {
  let ownerOrderTotal = 0;
  const order: CartItem[] = GetOwnerOrder();

  let i;
  for (i = 0; i < order.length; i++) {
    ownerOrderTotal += parseFloat(order[i].price);
  }
  console.log("owner order total: " + ownerOrderTotal.toFixed(2));
  return ownerOrderTotal.toFixed(2);
}
