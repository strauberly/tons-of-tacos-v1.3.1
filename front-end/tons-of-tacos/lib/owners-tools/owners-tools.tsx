"use server";

export async function getAllOrders(token: string | undefined) {
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
    const orders: Order[] | undefined = data;
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
    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
}
