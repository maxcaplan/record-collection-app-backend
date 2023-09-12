import Server from "./config/server";

import { typeDefs } from "./schema/typedefs";

const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 2007;
const server = new Server({ typeDefs }, port);

async function main() {
  await server.startServer();
  console.log(`API Server started at: http://localhost:${server.port}`);
}

main();
