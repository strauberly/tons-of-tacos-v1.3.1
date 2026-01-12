"use server";

import { cookies } from "next/headers";

function randomChar() {
  const min: number = 33;
  const max: number = 126;
  const random: number = Math.random() * (max - min + 1) + min;
  const excluded: number[] = [34, 92, 39];
  let choice: string = String.fromCharCode(0);

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
    const [, payloadBase64] = data.accessToken.split(".");
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
      "utf-8"
    );
    const subject = await JSON.parse(decodedPayload);

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

export async function Refresh() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  const response = await fetch(
    "http://localhost:8080/api/owners-tools/refresh",
    {
      method: "POST",
      headers: {
        Cookie: `${refreshToken?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken?.value),
      credentials: "include",
    }
  );
  const data = await response.json();
  const status = response.status;

  const [, payloadBase64] = data.accessToken.split(".");
  const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
  const subject = JSON.parse(decodedPayload);

  const login: OwnerLogin = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    ownerName: subject.ownername,
  };
  if (status === 200) {
    return login;
  } else {
    throw new Error("Issue refreshing login.");
  }
}

export async function StoreLogin(login: OwnerLogin) {
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

  login.accessToken = cookieStore.get("accessToken")
    ?.value as unknown as string;
  login.refreshToken = cookieStore.get("refreshToken")
    ?.value as unknown as string;
  login.ownerName = cookieStore.get("ownerName")?.value as unknown as string;
  return login;
}

export async function CookieCheck() {
  const cookieStore = cookies();

  const gotCookies: boolean = (await cookieStore).toString() === "";

  return gotCookies;
}

export async function OwnerLogout(accessToken: string) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  const address: string = `http://localhost:8080/api/owners-tools/logout`;

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
}

// this needs an update to accurately discern hotswap cookie from the others.
export async function nextCookiePresent() {
  const cookieStore = await cookies();

  if (cookieStore.has("__next_hmr_refresh_hash__")) {
    cookieStore.delete("__next_hmr_refresh_hash__");
  }
  return cookieStore.has("__next_hmr_refresh_hash__");
  // return cookieStore.has("accessToken");
}
