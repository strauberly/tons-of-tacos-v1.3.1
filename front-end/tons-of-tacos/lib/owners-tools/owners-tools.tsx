"use server";

export async function GetAllOrders(token: string) {
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
        credentials: "include",
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
      credentials: "include",
    });
    data = await response.json();

    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateOrderItemQuantity(
  orderUid: string,
  orderItemId: number,
  newQuantity: number,
  newSize: string,
  token: string
) {
  let response;
  let data;

  const address: string = `http://localhost:8080/api/owners-tools/orders/update-order-item/${orderUid}/${orderItemId}/${newQuantity}/${newSize}`;

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

export async function GetOrdersByCustomerPhone(phone: string, token: string) {
  console.log(phone);

  const customerOrdersResponse: CustomerOrdersResponse = {
    status: 0,
    body: "",
  };

  const response = await fetch(
    `http://localhost:8080/api/owners-tools/orders/get-order-customer-phone/phone?phone=${phone}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //
  const data = await response.json();
  const status = response.status;
  customerOrdersResponse.body = data;
  customerOrdersResponse.status = status;
  if (response.status === 200) {
    return customerOrdersResponse;
  } else {
    customerOrdersResponse.body = data.message;
    customerOrdersResponse.status = status;
    return customerOrdersResponse;
  }
}

export async function GetOrderByID(orderUid: string, token: string) {
  const orderResponse: OrderRequestResponse = {
    status: 0,
    body: {
      orderUid: "",
      customerUid: "",
      name: "",
      email: "",
      phone: "",
      orderItems: [],
      orderTotal: 0,
      created: "",
      ready: "",
      closed: "",
    },
  };

  const response = await fetch(
    `http://localhost:8080/api/owners-tools/orders/get-order-uid/orderUid?orderUid=${orderUid}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //
  const data = await response.json();
  const status = response.status;
  orderResponse.body = data;
  orderResponse.status = status;

  if (status === 200) {
    return orderResponse;
  } else {
    orderResponse.body = data.message;
    orderResponse.status = status;
    return orderResponse;
  }
}

export async function UpdateCustomer(customer: Customer, token: string) {
  let response;

  const uid: string = customer.customerUid;
  const name: string = customer.name;
  const phone: string = customer.phone;
  const email: string = customer.email;

  try {
    response = await fetch(
      `http://localhost:8080/api/owners-tools/customers/update-customer/${uid}/${name}/${phone}/${email}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export async function DailySales(token: string) {
  let response;
  try {
    response = await fetch(
      `http://localhost:8080/api/owners-tools/orders/sales`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
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
      orderEdit.itemSize,
      orderEdit.login
    );
  } else if (title === "Update Customer") {
    return UpdateCustomer(orderEdit.customer, orderEdit.login);
  }
}
