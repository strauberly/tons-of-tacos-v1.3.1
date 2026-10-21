"use server";

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

import https from "https";
import fs from "fs";
import path from "path";

interface FetchOptions extends https.RequestOptions {
  body?: string | Buffer;
}

let agent: https.Agent;

function getAgent(): https.Agent {
  if (!agent) {
    const ca = fs.readFileSync(
      path.resolve(process.cwd(), "./certificate.pem")
    );
    agent = new https.Agent({ rejectUnauthorized: true, ca });
  }
  return agent;
}

// const agent = new https.Agent({
//   ca: fs.readFileSync(path.resolve(process.cwd(), "./certificate.pem")),
//   rejectUnauthorized: true,
// });

export async function secureApiFetch(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  // const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  // const method = (options.method || "GET").toUpperCase();
  const { body, ...requestOptions } = options;
  requestOptions.method = (options.method || "GET").toUpperCase();
  requestOptions.agent = getAgent();

  // const agent = new https.Agent({
  //   ca: fs.readFileSync(path.resolve(process.cwd(), "./certificate.pem")),
  //   rejectUnauthorized: true,
  // });

  return new Promise((resolve, reject) => {
    // const request = https.request(url, { agent, ...options }, (res) => {
    // const request = https.request(
    //   url,
    //   { ...requestOptions, method, agent },
    //   (res) => {
    const request = https.request(url, requestOptions, (res) => {
      let data = "";
      // res.on(
      //   "data",
      // (chunk) =>
      res.on("data", (chunk) => {
        data += chunk;
        // );
      });
      // res.on("end", () =>
      res.on("end", () => {
        resolve(
          new Response(data, {
            status: res.statusCode,
            headers: res.headers as HeadersInit,
          })
        );
        // );
      });
    });
    // }
    // );

    // });
    request.on("error", reject);

    // if (body)
    if (body) {
      request.write(body);
    }
    request.end();
  });
}

// import { getHttpsAgent } from "./https-agent";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// type FetchOptions = Omit<RequestInit, "body"> & {
//   body?: string | FormData | null;
// };

// export async function secureApiFetch(
//   endpoint: string,
//   options: FetchOptions = {}
// ): Promise<Response> {
//   const url = `${API_BASE_URL}${endpoint}`;

//   return fetch(url, {
//     ...options,
//     dispatcher: getHttpsAgent(),
//   });
// }
