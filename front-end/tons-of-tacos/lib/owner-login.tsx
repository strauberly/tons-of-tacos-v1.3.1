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

function decrypt(string: string) {
  const encoder = new TextEncoder();
  const start: string = string.charAt(3);
  const end: string = string.charAt(string.length - 4);
  let wholeDecoded: string = "";

  let decoded: string = "";

  for (let i = 3; i < string.length; i = i + 4) {
    decoded = decoded.concat(string.charAt(i));
  }

  console.log(decoded);
  decoded = decoded.substring(1, decoded.toString().length - 1);
  wholeDecoded = wholeDecoded.concat(start + decoded + end);
  console.log(wholeDecoded);
  const codeBytes = encoder.encode(wholeDecoded);
  console.log(codeBytes);
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

  // return wholeDecoded;
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

  // console.log(rolledCodeBytes);

  rolledCodeBytes.forEach((codeByte) => {
    rolledChars.push(String.fromCharCode(codeByte));
  });

  // console.log(rolledChars);

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
    const [, payloadBase64] = data.token.split(".");
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
      "utf-8"
    );
    const payday = JSON.parse(decodedPayload);
    console.log(decodedPayload);
    console.log(payday);
    // console.log(decodedPayload.split("ownerName="));
    console.log("hi: " + payday.sub);
    console.log("decoded: " + decrypt(payday.sub));
    // const payday = JSON.parse(decodedPayload);
    console.log(decodedPayload);
    // console.log(payday);
    // const pay = decodedPayload.split("ownerName=");
    // const day = pay[1]?.substring(0, pay[1].indexOf(")"));
    // console.log(pay);
    // console.log(day);
    // const ownerered = payday.split(" ");
    // console.log(ownerered);

    return {
      status: status,
      response: { token: data.token, ownerName: data.ownerName },
    };
  } else {
    return { status: status, response: data.message };
  }
}
