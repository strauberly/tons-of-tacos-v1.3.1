"use server";

import Order from "@/components/owner-dashboard/order";

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
    // let orders: Order[] = [];
    const orders = data;

    // console.log(data);
    // console.log("orders: " + JSON.stringify(orders));
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

export async function AddToOrder(
  orderUid: string,
  menuItemId: number,
  quantity: number,
  itemSize: string,
  token: string
) {
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
    // const order = await data;

    // console.log("order: " + JSON.stringify(order));
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
  }
}
