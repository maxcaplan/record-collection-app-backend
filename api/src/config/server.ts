import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Express } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./logger";
import { pinoHttp } from "pino-http";

import type { Connector } from "../connectors/connector";

interface ResolverContext<DataType> extends BaseContext {
  dataSource?: Connector<DataType>;
}

export default class Server<
  ConnectorDataType,
  ConnectorType extends Connector<ConnectorDataType>,
> {
  app: Express;
  httpServer: http.Server;
  server: ApolloServer;
  port: number;
  connection: Connector<ConnectorDataType>;

  constructor(
    config: ApolloServerOptions<ResolverContext<ConnectorDataType>>,
    port: number = 2007,
    connector: ConnectorType,
  ) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.server = new ApolloServer<ResolverContext<ConnectorDataType>>({
      ...config,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
    this.port = port;
    this.connection = connector;
  }

  async startServer() {
    await this.server.start();

    this.app.use(pinoHttp({ logger }));

    this.app.use(
      "/",
      cors<cors.CorsRequest>(),
      bodyParser.json({ limit: "50mb" }),
      expressMiddleware(this.server, {
        context: async () => ({ dataSource: this.connection }),
      }),
    );

    await new Promise<void>(() => {
      this.httpServer.listen({ port: this.port }, () => {
        logger.info(`Server listening on port: ${this.port}`);
      });
    });
  }
}
