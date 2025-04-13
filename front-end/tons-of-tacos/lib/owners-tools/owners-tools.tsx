"use server";

export async function GetAllOrders(token: string | undefined) {
  console.log(token);
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
    let orders: Order[] = [];
    orders = data;

    console.log(data);
    console.log("orders: " + orders);
    return orders;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteOrder(orderUid: string, token: string | undefined) {
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
    let message: string = "";

    console.log(data.message);
    message = data.message;
    return message;
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
