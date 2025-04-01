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
