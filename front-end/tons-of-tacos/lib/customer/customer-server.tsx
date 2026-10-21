"use server";

import { CustomerOrder, CustomerOrderResponse } from "@/types";
import { secureApiFetch } from "../api-base";

/* check customer order submission response in types.d.ts
Otherwise follow tutorial suggestion notes front end todo
*/

// type CustomerOrderResponse = {
//   orderNumber: string;
//   customerName: string;
//   customerEmail: string;
//   customerPhone: string;
//   orderTotal: number;
//   orderItems: Array<{
//     quantity: number;
//     itemName: string;
//     size: string;
//     total: number;
//   }>;
//   status: number;
//   message?: string;
// };

let response;
let data;
let status;
export async function submitOrder(
  order: CustomerOrder
): Promise<CustomerOrderResponse> {
  try {
    response = await secureApiFetch("order/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    data = await response.json();
    status = response.status;

    const submissionResponse: CustomerOrderResponse = {
      orderUid: data.orderUid,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      orderTotal: data.orderTotal,
      orderItems: data.orderItems,
      status: status,
      message: data.message,
    };

    return submissionResponse;

    // return {
    //   orderNumber: data.orderUid,
    //   customerName: data.customerName,
    //   customerEmail: data.customerEmail,
    //   customerPhone: data.customerPhone,
    //   orderTotal: data.orderTotal,
    //   orderItems: data.orderItems,
    //   status: status,
    //   message: data.message,
    // };
  } catch (error) {
    throw new Error(
      "Sorry, we can't process your order right now." + `${error}`
    );
  }
}
/*
  May need return type established in types.d.ts
  if status 201 return
   {
   orderNumber : data.orderUid;
  customerName : data.customerName;
   customerEmail : data.customerEmail;
  customerPhone : data.customerPhone;
  orderTotal : data.orderTotal;
  }
  else
    return
 {message:data.message}
  */
// }
// import { secureApiFetch } from "../api-base";

// import { GetOwnerOrder } from "../owners-tools/owners-tools-client";

// import { GetCart } from "../cart";

// let isLoggedInRef: boolean;

// export async function setIsLoggedIn(loggedIn: boolean) {
//   if (loggedIn) {
//     isLoggedInRef = true;
//   } else {
//     isLoggedInRef = false;
//   }
// }

// // export type responseMessage = { message: string };

// // export const resp: responseMessage = { message: "" };

// export async function SendOrder(
//   //   previousState: responseMessage,
//   previousState: "",
//   formData: FormData
// ) {
//   const firstName = formData.get("first_name");
//   const lastName = formData.get("last_name");
//   const phone = formData.get("phone");
//   const email = formData.get("email");

//   type item = {
//     menuId: string;
//     quantity: number;
//     size: string;
//   };

//   let cartItems: CartItem[];

//   console.log(isLoggedInRef);

//   if (isLoggedInRef === true) {
//     cartItems = GetOwnerOrder();
//   } else {
//     cartItems = GetCart();
//   }

//   cartItems.forEach((cartItem) => {
//     if (cartItem.size === "") {
//       cartItem.size = "NA";
//     }
//   });

//   const orderItems: item[] = cartItems.map((i) => {
//     return {
//       menuId: i.menuId,
//       quantity: i.quantity,
//       size: i.size,
//     };
//   });

//   const order = {
//     customer: {
//       name: firstName + " " + lastName,
//       phoneNumber: phone,
//       email: email,
//     },
//     order: orderItems,
//   };

//   let data;
//   let response;
//   let status;

//   try {
//     response = await secureApiFetch("order/checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(order),
//     });
//     // response = await fetch("http://localhost:8080/api/order/checkout", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(order),
//     // });
//     // data = await response.text();
//     data = await response.json();
//     status = response.status;

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     throw new Error("Sorry, we can't process your order right now.");
//   }

//   const orderNumber = data.orderUid;
//   const customerName = data.customerName;
//   const customerEmail = data.customerEmail;
//   const customerPhone = data.customerPhone;
//   const orderTotal = data.orderTotal;

//   const receivedOrderItems: string[] = data.orderItems.map(
//     (orderItem: OrderItem) =>
//       `\n${orderItem.quantity}  x  ${orderItem.itemName}:
//     size  (${orderItem.size})  =  $${orderItem.total.toFixed(2)}`
//   );

//   const orderConfirmation = `Hola, ${customerName}!

//   Thank you for your order of:
//   ${receivedOrderItems}

//   $${orderTotal.toFixed(
//     2
//   )} is your total and we accept cash, credit, debit, and crypto at the truck.

//   Your confirmation is ${orderNumber}  and your food should be ready in about 15 minutes.

//   We'll try to contact you to let you know your order is ready at ${customerPhone} and ${customerEmail}.

//   See you at the truck!`;

//   if (status === 201) {
//     return { message: orderConfirmation };
//   } else {
//     return { message: data.message };
//   }
// }
