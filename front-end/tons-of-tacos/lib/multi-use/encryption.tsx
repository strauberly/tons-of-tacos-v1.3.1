function randomChar() {
  const min: number = 33;
  const max: number = 126;
  const random: number = Math.random() * (max - min + 1) + min;

  const excluded: number[] = [
    34, 35, 37, 39, 40, 41, 43, 44, 47, 58, 59, 60, 61, 62, 91, 92, 93, 96, 123,
    125,
  ];
  let choice: string = String.fromCharCode(0);

  excluded.forEach((excludedNumber) => {
    choice =
      String.fromCharCode(random) == String.fromCharCode(excludedNumber)
        ? randomChar()
        : String.fromCharCode(random);
  });
  return choice;
}
// BEGIN_KEY=3
// END_KEY=4

export function encrypt(string: string) {
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

export function decrypt(string: string) {
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
