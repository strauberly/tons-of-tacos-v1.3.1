export async function UpdateCustomerName(
  customerUid: string,
  newCustomerName: string,
  token: string
) {
  const updateCustomerResponse: UpdateCustomerResponse = {
    status: 0,
    body: "",
  };
  try {
    const response = await fetch(
      `http://localhost:8080/api/owners-tools/customers/edit-customer-name/${customerUid}/${newCustomerName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    updateCustomerResponse.status = data.status;
    updateCustomerResponse.body = data.message;
    return updateCustomerResponse;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export async function UpdateCustomerEmail(
  customerUid: string,
  newCustomerEmail: string,
  token: string
) {
  const updateCustomerResponse: UpdateCustomerResponse = {
    status: 0,
    body: "",
  };
  try {
    const response = await fetch(
      `http://localhost:8080/api/owners-tools/customers/edit-customer-email/${customerUid}/${newCustomerEmail}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    updateCustomerResponse.status = data.status;
    updateCustomerResponse.body = data.message;
    return updateCustomerResponse;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
