"use server";

import { cookies } from "next/headers";

function randomChar(): string {
  //  "!", and "?"
  // Whitelist of safe characters for cookie names (RFC 6265)
  // a-z A-Z 0-9 ! # $ % & ' * + - . ^ _ ` | ~
  const safeChars: string =
    // keep trimming out names chars from headers name + ` etc
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-.^_`|~";

  const randomIndex: number = Math.floor(Math.random() * safeChars.length);
  return safeChars.charAt(randomIndex);
}

// function randomChar() {
//   const min: number = 33;
//   const max: number = 126;
//   // const random: number = Math.floor(Math.random() * (max - min + 1) + min);
//   // const excluded: number[] = [34, 92, 39];
//   const excluded: number[] = [
//     9, 10, 13, 32, 34, 35, 37, 39, 40, 41, 43, 44, 47, 58, 59, 60, 61, 62, 91,
//     92, 93, 96, 123, 124, 125,
//   ];
//   // const excluded: number[] = [32, 34, 35, 37, 39, 43, 47, 58, 59, 61, 92, 44];
//   // let choice: string = String.fromCharCode(0);

//   // excluded.forEach((excludedNumber) => {
//   //   choice =
//   //     String.fromCharCode(random) == String.fromCharCode(excludedNumber)
//   //       ? randomChar()
//   //       : String.fromCharCode(random);
//   // });
//   // return choice;
//   let random: number;
//   do {
//     random = Math.floor(Math.random() * (max - min + 1)) + min;
//   } while (excluded.includes(random));
//   return String.fromCharCode(random);
// }

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

// login should be in an auth header
export async function OwnerLogin(
  previousState: responseObj,
  formData: FormData
) {
  // rename ownerid as username
  const userName = formData.get("owner_id") as string;
  const password = formData.get("password") as string;
  const rolledUsername = encrypt(userName);
  const rolledPassword = encrypt(password);

  const login = {
    username: rolledUsername,
    psswrd: rolledPassword,
  };
  console.log("login: " + login);
  const response = await fetch("http://localhost:8080/api/owners-tools/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(login),
  });
  const data = await response.json();
  const status = response.status;
  // const loginAccess = response.headers.get("access");

  if (status === 200) {
    console.log(response);
    const cookieHeader = response.headers.get("set-cookie");
    const setCookie = response.headers.getSetCookie();
    console.log("set cookie: " + setCookie.toString());
    // console.log("cookie header" + cookieHeader);
    const session = sessionCookie(response);
    // console.log("session: " + session);
    console.log("session: " + JSON.stringify(session));
    return {
      status: status,
      response: {
        // recResponse
        accessToken: (await session).accessToken,
        // accessToken: data.accessToken,
        refreshToken: (await session).refreshToken,
        // refreshToken: data.refreshToken,
        ownerName: (await session).ownerName,
        userName: login.username,
        // ownerName: subject.ownername,
        // sessionCookie(response)
      },
    };
  } else {
    return { status: status, response: data.message };
  }
  // } else {
  // throw new Error("no cookie");
  // }
}

export async function StoreLogin(login: OwnerLogin) {
  console.log("login to store : " + JSON.stringify(login));
  console.log("login userName : " + login.userName);
  console.log("login token : " + login.accessToken);
  // check first and delete like refresh login
  (await cookies()).set(
    `${login.userName}`,
    // JSON.stringify(login.accessToken),
    `${login.accessToken}`,
    // login.accessToken,
    {
      // (await cookies()).set(`${login.ownerName}`, JSON.stringify(login), {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      // path: "/api/owners-tools",
      path: "/owners-tools",
      // path: "/owners-tools/**",
      maxAge: 60 * 60 * 24 * 7,
    }
  );
}

export async function Refresh(userName: string) {
  console.log("refresh username: " + userName);
  // export async function Refresh(user: string) {
  // const fetchedLogin: OwnerLogin = await GetLogin(user);
  const cookieStore = await cookies();
  const cookie = cookieStore.get(`${userName}`);
  console.log("cookie: " + cookie?.value);
  // const cookie = cookieStore.get(`${user}`);
  const accessToken = cookie?.value;
  console.log("access token: " + accessToken);
  // const accessToken = await JSON.parse(`${cookie?.value}`);
  // const fetchedLogin: OwnerLogin = await JSON.parse(`${cookie?.value}`);
  let response: Response;
  // let data;
  console.log("cookieValue: " + `${cookie?.value}`);
  console.log("cookieName: " + `${cookie?.name}`);
  try {
    response = await fetch("http://localhost:8080/api/owners-tools/refresh", {
      method: "POST",
      credentials: "include",
      headers: {
        // Cookie: `${cookie?.value}`,
        // just send the access token
        // try this!!!!!!!
        Cookie: `token=${accessToken}`,
        // Cookie: `token=${fetchedLogin.accessToken}`,
        // Cookie: `token=${fetchedLogin.refreshToken}`,
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });

    // data = await response.json();
  } catch {
    throw new Error(
      "Weren't able to connect to server please try refreshing browser, logging out and back in. Give us a shout if that doesn't work. Thanks!"
    );
  }
  const status = response.status;
  console.log("status: " + status);

  const data = await response.json();
  console.log("refresh data: " + data.message);
  // catch if status not 200 here
  // utilize sessionCookie method for decrypting claims
  const [, payloadBase64] = data.accessToken.split(".");
  const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");

  const subject = JSON.parse(decodedPayload);

  const login: OwnerLogin = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    ownerName: subject.ownername,
    userName: userName,
  };
  // const login: OwnerLogin = {
  //   accessToken: data.accessToken,
  //   refreshToken: data.refreshToken,
  //   ownerName: subject.ownername,
  // };
  if (status == 200) {
    return login;
  } else {
    throw new Error("Issue refreshing login.");
  }
}

export async function RefreshLogin(login: OwnerLogin) {
  // export async function RefreshLogin(login: OwnerLogin, userName: string) {
  (await cookies()).set(`${login.userName}`, "", {
    // (await cookies()).set(`${userName}`, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/owners-tools",
    maxAge: -1,
  });

  (await cookies()).set(
    `${login.userName}`,
    login.accessToken,
    // JSON.stringify(login.accessToken),
    {
      // (await cookies()).set(`${login.ownerName}`, JSON.stringify(login), {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/owners-tools",
      // adjust as timing is appropriate
      maxAge: 60 * 60 * 24,
    }
  );
  return login.ownerName;
}
// check that this works as intended
export async function GetLogin(userName: string) {
  // export async function GetLogin(user: string) {
  console.log("get login: " + userName);
  // console.log("get login: " + user);
  const cookieStore = await cookies();
  const cookie = cookieStore.get(`${userName}`);
  console.log("cookie: " + cookie);
  // const cookie = cookieStore.get(`${user}`);
  let login: OwnerLogin = {
    accessToken: "",
    refreshToken: "",
    ownerName: "",
    userName: "",
  };
  // let login: OwnerLogin = {
  //   accessToken: "",
  //   refreshToken: "",
  //   ownerName: "",
  // };

  if (cookie) {
    try {
      login = JSON.parse(cookie.value) as OwnerLogin;
      console.log("login: " + login);
      // try catch
      if (!login.accessToken || !login.refreshToken || !login.ownerName) {
        console.log("nope");
        return login;
      }
      return login;
    } catch (error) {
      console.error("Error parsing cookie:", error);
    }
  }
  console.log("find failed");
  return login;
}

export async function CookieCheck() {
  const cookieStore = cookies();

  const gotCookies: boolean =
    (await cookieStore).get("accessToken") === undefined;

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

export async function nextCookiePresent() {
  const cookieStore = await cookies();

  if (cookieStore.has("__next_hmr_refresh_hash__")) {
    cookieStore.delete("__next_hmr_refresh_hash__");
    return true;
  } else {
    return false;
  }
}

export async function GetCookieExp(login: OwnerLogin) {
  const [, payloadBase64] = login.accessToken.split(".");
  const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
  const subject = JSON.parse(decodedPayload);
  const exp = subject.exp * 1000;
  return exp;
}

async function sessionCookie(response: Response) {
  // console.log(response);
  const cookieHeader = response.headers.get("set-cookie");
  if (cookieHeader) {
    const tokenCookie = cookieHeader.split(";")[0];
    // console.log("token cookie: " + tokenCookie);

    const token = tokenCookie.split("=")[1];
    // console.log("token: " + token);
    const [, payloadBase64] = token.split(".");
    // const [, payloadBase64] = cookieHeader.split(".");
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
      "utf-8"
    );
    // parse claims from jwt
    const payload = await JSON.parse(decodedPayload);
    // console.log("payload: " + payload);
    return {
      accessToken: token,
      refreshToken: payload.refreshToken,
      ownerName: payload.ownerName,
    };
  } else {
    throw new Error("uh uh.");
  }
}
