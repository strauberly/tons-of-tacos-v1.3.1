import fs from "fs";
import https from "https";
import path from "path";

let agent: https.Agent | null = null;

export function getHttpsAgent(): https.Agent {
  if (agent) {
    return agent;
  }

  const certPath = path.join(process.cwd(), "certificate.pem");
  const cert = fs.readFileSync(certPath, "utf-8");

  agent = new https.Agent({
    ca: [cert],
  });

  return agent;
}
