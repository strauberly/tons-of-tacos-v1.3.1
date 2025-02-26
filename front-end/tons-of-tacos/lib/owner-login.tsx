type token = { token: "" };
export async function OwnerLogin(previousState: token, formData: FormData) {
  const userName = formData.get("owner_id");
  const password = formData.get("password");

  const login = {
    username: { userName },
    psswrd: { password },
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
      body: JSON.stringify(login),
    });
    data = await response.json();
    status = response.status;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Sorry, login failed. Please try again or contact us.");
  }

  if (status === 200) {
    const token = data;
    return token;
  } else {
    return response.text;
  }
}
