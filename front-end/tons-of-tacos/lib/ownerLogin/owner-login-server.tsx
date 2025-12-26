"use server";

import { cookies } from "next/headers";

// const cookieStore = await cookies();

function randomChar() {
  const min: number = 33;
  const max: number = 126;
  const random: number = Math.random() * (max - min + 1) + min;
  const excluded: number[] = [34, 92, 39];
  let choice: string = String.fromCharCode(0);

  console.log();

  excluded.forEach((excludedNumber) => {
    choice =
      String.fromCharCode(random) == String.fromCharCode(excludedNumber)
        ? randomChar()
        : String.fromCharCode(random);
  });
  return choice;
}

function encrypt(string: string) {
  const encoder = new TextEncoder();
  const codeBytes = encoder.encode(string);
  const rolledCodeBytes: number[] = [];
  const rolledChars: string[] = [];

  codeBytes.forEach((codeByte) => {
    codeByte += 3;
    rolledCodeBytes.push(codeByte);
  });

  rolledCodeBytes.forEach((codeByte) => {
    rolledChars.push(String.fromCharCode(codeByte));
  });

  for (let i = 0; i < rolledChars.length; i++) {
    rolledChars.splice(i, 0, randomChar());
    i++;
    rolledChars.splice(i, 0, randomChar());
    i++;
    rolledChars.splice(i, 0, randomChar());
    i++;
  }
  rolledChars.push(randomChar());
  rolledChars.push(randomChar());
  rolledChars.push(randomChar());

  return rolledChars.join("");
}

export type responseToken = { token: "" };

export type responseObj = {
  status: number;
  response: object;
};

function decrypt(string: string) {
  const encoder = new TextEncoder();
  const start: string = string.charAt(3);
  const end: string = string.charAt(string.length - 4);

  let wholeDecoded: string = "";
  let decoded: string = "";

  for (let i = 3; i < string.length; i = i + 4) {
    decoded = decoded.concat(string.charAt(i));
  }

  decoded = decoded.substring(1, decoded.toString().length - 1);
  wholeDecoded = wholeDecoded.concat(start + decoded + end);

  const codeBytes = encoder.encode(wholeDecoded);
  const rolledCodeBytes: number[] = [];
  const rolledChars: string[] = [];

  codeBytes.forEach((codeByte) => {
    codeByte -= 3;
    rolledCodeBytes.push(codeByte);
  });

  rolledCodeBytes.forEach((codeByte) => {
    rolledChars.push(String.fromCharCode(codeByte));
  });

  return rolledChars.join("");
}

export async function OwnerLogin(
  previousState: responseObj,
  formData: FormData
) {
  const userName = formData.get("owner_id") as string;
  const password = formData.get("password") as string;
  const rolledUsername = encrypt(userName);
  const rolledPassword = encrypt(password);

  const login = {
    username: rolledUsername,
    psswrd: rolledPassword,
  };

  const response = await fetch("http://localhost:8080/api/owners-tools/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  });
  const data = await response.json();
  const status = response.status;

  if (status === 200) {
    console.log("data: " + data);
    console.log("token: " + data.accessToken);
    console.log("refresh token: " + data.token);
    console.log(data.accessToken.subject);

    // const [, payloadBase64] = data.token.split(".");
    const [, payloadBase64] = data.accessToken.split(".");
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
      "utf-8"
    );
    const subject = await JSON.parse(decodedPayload);
    console.log("exp:" + subject.exp);
    console.log(data.token);
    console.log(subject);
    console.log(decodedPayload);
    console.log(decrypt(subject.sub));
    return {
      status: status,
      response: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        ownerName: decrypt(subject.ownername),
      },
    };
  } else {
    return { status: status, response: data.message };
  }
}

// refresh endpoint

export async function Refresh() {
  // get the refresh token and send that not the body make sure path and all that is good
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  const response = await fetch(
    "http://localhost:8080/api/owners-tools/refresh",
    {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${refreshToken?.value}`,
        Cookie: `${refreshToken?.value}`,
        "Content-Type": "application/json",
      },
      // // Cookie: `${refreshToken?.value}`,
      body: JSON.stringify(refreshToken?.value),
      credentials: "include",
    }
  );
  console.log(response);
  const data = await response.json();
  const status = response.status;

  console.log("access: " + data.accessToken);
  console.log("refresh: " + data.refreshToken);
  console.log("refresh status: " + status);

  const [, payloadBase64] = data.accessToken.split(".");
  const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
  const subject = JSON.parse(decodedPayload);

  console.log("owner name:" + decrypt(subject.ownername));
  console.log("owner name:" + subject.ownername);

  const login: OwnerLogin = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    ownerName: subject.ownername,
  };

  console.log(login);

  return login;
}

// token response
export async function StoreLogin(login: OwnerLogin) {
  console.log("store: " + login.ownerName);

  (await cookies()).set({
    name: "accessToken",
    value: login.accessToken,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/owners-tools",
  });

  (await cookies()).set({
    name: "refreshToken",
    value: login.refreshToken,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/owners-tools",
  });
  (await cookies()).set({
    name: "ownerName",
    value: login.ownerName,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/owners-tools",
  });
}

export async function GetLogin() {
  const login: OwnerLogin = {
    accessToken: "",
    refreshToken: "",
    ownerName: "",
  };

  const cookieStore = await cookies();

  // console.log(cookieStore);

  login.accessToken = cookieStore.get("accessToken")
    ?.value as unknown as string;
  login.refreshToken = cookieStore.get("refreshToken")
    ?.value as unknown as string;
  login.ownerName = cookieStore.get("ownerName")?.value as unknown as string;
  return login;
}

export async function CookieCheck() {
  const cookieStore = cookies();
  // const gotCookies: boolean = (await cookieStore).size;
  const gotCookies: boolean = (await cookieStore).toString() === "";
  console.log("cookie check:" + (await gotCookies));
  console.log("store: " + (await cookieStore));
  return gotCookies;
}

// create route to logout a user by deleting their cookie

// use access token for request
// use refresh token in body

export async function OwnerLogout(accessToken: string) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  // const accessToken = cookieStore.get("accessToken");
  const address: string = `http://localhost:8080/api/owners-tools/logout`;
  console.log(address);
  console.log(refreshToken);

  let response;
  let data;
  try {
    response = await fetch(address.toString(), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(refreshToken),
    });
    data = await response.json();
    console.log("logout response: " + data.body);

    return data.message;
  } catch (error) {
    console.log(error);
  }
}
// maybe rest to accept a list of cookies to delete

export async function DeleteCookies() {
  // const cookieStore = cookies();
  // (await cookieStore)
  // .getAll()
  // .forEach(async (cookie) => (await cookieStore)
  (await cookies()).set({
    name: "accessToken",
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(0),
    path: "/owners-tools",
  });
  (await cookies()).set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(0),
    path: "/owners-tools",
  });
  (await cookies()).set({
    name: "ownerName",
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(0),
    path: "/owners-tools",
  });
  // );
  // const cookieStore = cookies();
  // (await cookieStore)
  //   .getAll()
  //   .forEach(async (cookie) => (await cookieStore).delete(`${cookie.name}`));
}

export async function nextCookiePresent() {
  const cookieStore = await cookies();
  return cookieStore.has("accessToken");
}
