import Server from "./config/server";
import MongoConnector from "./connectors/mongoConnector";

import { reportError } from "./utility/errorReporting";
import { getMongoConnectionComponents } from "./utility/getMongoConnectionComponents";

import { typeDefs } from "./schema/typedefs";

import type { DocumentNode } from "graphql";
import { Document } from "mongodb";
import type { Connector } from "./connectors/connector";

/**
 * Creates and starts a connection with the database
 */
async function initMongoConnection(): Promise<MongoConnector> {
  const components = getMongoConnectionComponents();
  const connection: MongoConnector = new MongoConnector(...components);

  return connection;
}

/**
 * Creates and starts an http server
 */
async function initServer<
  ConnectorDataType,
  ConnectorType extends Connector<ConnectorDataType>,
>(
  typeDefs: DocumentNode[],
  connector: ConnectorType,
): Promise<Server<ConnectorDataType, ConnectorType>> {
  const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 2007;
  const server = new Server<ConnectorDataType, ConnectorType>(
    { typeDefs },
    port,
    connector,
  );

  return server;
}

async function main() {
  try {
    const connection = await initMongoConnection();

    const server = await initServer<Document, MongoConnector>(
      typeDefs,
      connection,
    );
    await server.startServer();
    server.connection.connect();
  } catch (e) {
    reportError(e);
  }
}

main();
