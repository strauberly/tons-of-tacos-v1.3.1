import { GetOwnerOrder } from "./owners-tools/owners-tools-client";

export let isLoggedInRef: boolean;

export function setIsLoggedIn(loggedIn: boolean) {
  if (loggedIn) {
    isLoggedInRef = true;
  } else {
    isLoggedInRef = false;
  }
}

export function CreateCart() {
  const cart: CartItem[] = [];
  if (!sessionStorage.getItem("tons-of-tacos-cart")) {
    sessionStorage.setItem("tons-of-tacos-cart", JSON.stringify(cart));
  }
}

export async function AddItemToCart(
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
    price: price,
  };

  let newCart: CartItem[] = [];
  // try {
  newCart = GetCart();
  newCart.push(cartItem);
  // } catch (error) {
  //   throw new Error(
  //     "Cart not currently available for adding an item." + `${error}`
  //   );
  // }
  sessionStorage.removeItem("tons-of-tacos-cart");
  sessionStorage.setItem("tons-of-tacos-cart", JSON.stringify(newCart));
}

export function RemoveCartItem(itemId: string) {
  const updatedCart: CartItem[] = GetCart().filter(
    (cartItem) => cartItem.id !== itemId
  );

  sessionStorage.removeItem("tons-of-tacos-cart");
  sessionStorage.setItem("tons-of-tacos-cart", JSON.stringify(updatedCart));
}

export function GetCart() {
  let oldCart: CartItem[] = [];

  try {
    oldCart = JSON.parse(sessionStorage.getItem("tons-of-tacos-cart") || "{}");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("hrm..." + error);
  }
  return oldCart;
}

export async function GetCartQuantity() {
  const cart: CartItem[] = GetCart();
  let cartQuantity: number[] = [];
  let quantity: number = 0;
  try {
    cartQuantity = cart.map((cartItem) => cartItem.quantity);
    cartQuantity.forEach((num) => (quantity += num));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Can't update cart quantity right now");
  }
  return quantity;
}

export function UpdateCart(cart: CartItem[]) {
  try {
    sessionStorage.removeItem("tons-of-tacos-cart");
    sessionStorage.setItem("tons-of-tacos-cart", JSON.stringify(cart));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Cant update cart");
  }
}

export function ResetCart() {
  try {
    sessionStorage.removeItem("tons-of-tacos-cart");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Problem with resetting the cart");
  }
}

export type responseMessage = { message: "" };

export const resp: string = "";

export async function SendOrder(
  previousState: responseMessage,
  formData: FormData
) {
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const phone = formData.get("phone");
  const email = formData.get("email");

  type item = {
    menuId: string;
    quantity: number;
    size: string;
  };

  let cartItems: CartItem[];

  console.log(isLoggedInRef);

  if (isLoggedInRef === true) {
    cartItems = GetOwnerOrder();
  } else {
    cartItems = GetCart();
  }

  cartItems.forEach((cartItem) => {
    if (cartItem.size === "") {
      cartItem.size = "NA";
    }
  });

  const orderItems: item[] = cartItems.map((i) => {
    return {
      menuId: i.menuId,
      quantity: i.quantity,
      size: i.size,
    };
  });

  const order = {
    customer: {
      name: firstName + " " + lastName,
      phoneNumber: phone,
      email: email,
    },
    order: orderItems,
  };

  let data;
  let response;
  let status;

  try {
    response = await fetch("http://localhost:8080/api/order/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    data = await response.json();
    status = response.status;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Sorry, we can't process your order right now.");
  }

  const orderNumber = data.orderUid;
  const customerName = data.customerName;
  const customerEmail = data.customerEmail;
  const customerPhone = data.customerPhone;
  const orderTotal = data.orderTotal;

  const receivedOrderItems: string[] = data.orderItems.map(
    (orderItem: OrderItem) =>
      `\n${orderItem.quantity}  x  ${orderItem.itemName}:
    size  (${orderItem.size})  =  $${orderItem.total.toFixed(2)}`
  );

  const orderConfirmation = `Hola, ${customerName}!
  
  Thank you for your order of: 
  ${receivedOrderItems}
  
  $${orderTotal.toFixed(
    2
  )} is your total and we accept cash, credit, debit, and crypto at the truck.
  
  Your confirmation is ${orderNumber}  and your food should be ready in about 15 minutes.
  
  We'll try to contact you to let you know your order is ready at ${customerPhone} and ${customerEmail}.
  
  See you at the truck!`;

  if (status === 201) {
    return { message: orderConfirmation };
  } else {
    return { message: data.message };
  }
}
