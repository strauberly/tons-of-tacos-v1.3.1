// import { getHttpsAgent } from "./https-agent";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// // interface SecureRequestInit extends RequestInit {
// //   agent?: ReturnType<typeof getHttpsAgent>;
// // }

// type FetchOptions = Omit<RequestInit, "body"> & {
//   body?: string | FormData | null;
// };

// export async function secureApiFetch(
//   endpoint: string,
//   options: FetchOptions = {}
// ): Promise<Response> {
//   const agent = getHttpsAgent();
//   const url = `${API_BASE_URL}${endpoint}`;

//   console.log(url.toString());
//   console.log(url);
//   console.log(`${url}`);

//   return fetch(url, { ...options, agent } as RequestInit);
// }

// export async function secureApiFetch(endpoint: string) {
// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// return fetch(url, {
//   dispatcher: agent,
// });

// import https from "https";
// import fs from "fs";
// import path from "path";

// export async function secureApiFetch(endpoint: string) {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const url = `${baseUrl}${endpoint}`;

//   console.log(url);

//   const agent = new https.Agent({
//     ca: fs.readFileSync(path.resolve(process.cwd(), "./certificate.pem")),
//     rejectUnauthorized: true,
//   });

//   return new Promise((resolve, reject) => {
//     https
//       .get(url, { agent }, (res) => {
//         let data = "";
//         res.on("data", (chunk) => {
//           data += chunk;
//         });
//         res.on("end", () => {
//           resolve(new Response(data, { status: res.statusCode }));
//         });
//       })
//       .on("error", reject);
//   });
// }

import { getHttpsAgent } from "./https-agent";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: string | FormData | null;
};

export async function secureApiFetch(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;

  return fetch(url, {
    ...options,
    dispatcher: getHttpsAgent(),
  });
}
