import Server from "./config/server";
import MongoConnector from "./connectors/mongoConnector";

import { reportError } from "./utility/errorReporting";
import { getMongoConnectionComponents } from "./utility/getMongoConnectionComponents";

import { typeDefs } from "./schema/typedefs";
import type { DocumentNode } from "graphql";

/**
 * Creates and starts a connection with the database
 */
async function initMongoConnection(): Promise<Connection> {
  const components = getMongoConnectionComponents();
  const connection = new MongoConnector(...components);

  return connection;
}

/**
 * Creates and starts an http server
 */
async function initServer(typeDefs: DocumentNode[]): Promise<Server> {
  const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 2007;
  const server = new Server({ typeDefs }, port);

  await server.startServer();

  return server;
}

async function main() {
  try {
    // const connection = await initConnection();

    const server = await initServer(typeDefs);
  } catch (e) {
    reportError(e);
  }
}

main();
