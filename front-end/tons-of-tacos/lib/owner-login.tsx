"use server";

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

  console.log(rolledCodeBytes);

  rolledCodeBytes.forEach((codeByte) => {
    rolledChars.push(String.fromCharCode(codeByte));
  });

  console.log(rolledChars);

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

  console.log(rolledChars);
  console.log(rolledChars.join(""));

  return rolledChars.join("");
}

export type responseToken = { token: "" };

export async function OwnerLogin(
  previousState: responseToken,
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

  try {
    const response = await fetch(
      "http://localhost:8080/api/owners-tools/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      }
    );
    const data = await response.json();
    const status = response.status;

    if (status === 200) {
      return { token: data.token };
    } else {
      console.log(data.message);
      return data.message;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(
      "Sorry, login failed. Please try again or contact us." + `${error}`
    );
  }
}
