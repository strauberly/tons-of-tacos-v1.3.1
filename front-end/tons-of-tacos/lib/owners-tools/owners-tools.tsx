"use server";

import OrderItem from "@/components/owner-dashboard/order-item";

export async function GetAllOrders(token: string) {
  // console.log(token);
  let response;
  let data;
  try {
    response = await fetch(
      "http://localhost:8080/api/owners-tools/orders/get-orders",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data = await response.json();
    const orders = data;
    return orders;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteOrder(orderUid: string, token: string) {
  console.log(orderUid);
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/delete-order/${orderUid}`;
  console.log(address);
  console.log(token);
  try {
    response = await fetch(address.toString(), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await response.json();
    // let message: string = "";

    console.log(data.message);
    // message = data.message;
    // confirmation = data.message;
    // return message;
    return data.message;
  } catch (error) {
    console.log(error);
  }
}
export async function RemoveFromOrder(orderItemId: number, token: string) {
  console.log(orderItemId);
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/remove-from-order/${orderItemId}`;
  console.log(address);
  console.log(token);
  try {
    response = await fetch(address.toString(), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await response.json();
    // let message: string = "";

    console.log(data.message);
    // message = data.message;
    // confirmation = data.message;
    // return message;
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function AddToOrder(
  orderUid: string,
  menuItemId: number,
  quantity: number,
  itemSize: string,
  token: string
) {
  console.log(itemSize);
  console.log(orderUid);
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/add-to-order/${orderUid}/${menuItemId}/${quantity}/${itemSize}`;
  console.log(address);
  console.log(token);
  try {
    response = await fetch(address.toString(), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await response.json();
    // let message: string = "";

    console.log(data);
    // message = data.message;
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateOrderItemQuantity(
  orderUid: string,
  orderItemId: number,
  newQuantity: number,
  token: string
) {
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/update-order-item/${orderUid}/${orderItemId}/${newQuantity}`;

  try {
    response = await fetch(address.toString(), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await response.json();
    console.log(data);
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function MarkOrderReady(
  orderUid: string,
  token: string | undefined
) {
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/order-ready/${orderUid}`;

  try {
    response = await fetch(address.toString(), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
export async function MarkOrderClosed(
  orderUid: string,
  token: string | undefined
) {
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/close-order/${orderUid}`;

  try {
    response = await fetch(address.toString(), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
export async function DeleteConfirmation(orderUid: string, token: string) {
  const message = await DeleteOrder(orderUid, token);
  return message;
}

export async function GetOrder(orderUid: string, token: string) {
  console.log(orderUid);
  let response;
  // let data;
  try {
    response = await fetch(
      `http://localhost:8080/api/owners-tools/orders/get-order-uid/orderUid?orderUid=${orderUid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.json();
    // rewrite for if not 200
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function ExecuteConfirm(title: string, orderEdit: OrderEdit) {
  if (title === "Add To Order") {
    return AddToOrder(
      orderEdit.orderUid,
      Number(orderEdit.menuItemId),
      orderEdit.quantity,
      orderEdit.itemSize,
      orderEdit.login
    );
  } else if (title === "Delete") {
    return DeleteOrder(orderEdit.orderUid, orderEdit.login);
  } else if (title === "Remove From Order") {
    return RemoveFromOrder(orderEdit.orderItem.orderItemId, orderEdit.login);
  } else if (title === "Update Order Item") {
    return UpdateOrderItemQuantity(
      orderEdit.orderUid,
      orderEdit.orderItem.orderItemId,
      orderEdit.quantity,
      orderEdit.login
    );
  }
}
