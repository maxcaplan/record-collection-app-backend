import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Express } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "./logger";
import { pinoHttp } from "pino-http";

export default class Server {
  app: Express;
  httpServer: http.Server;
  server: ApolloServer;
  port: number;

  constructor(config: ApolloServerOptions<BaseContext>, port: number = 2007) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.server = new ApolloServer({
      ...config,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
    this.port = port;
  }

  async startServer() {
    await this.server.start();

    this.app.use(pinoHttp({ logger }));

    this.app.use(
      "/",
      cors<cors.CorsRequest>(),
      bodyParser.json({ limit: "50mb" }),
      expressMiddleware(this.server, {}),
    );

    await new Promise<void>(() => {
      this.httpServer.listen({ port: this.port }, () => {
        logger.info(`Server listening on port: ${this.port}`);
      });
    });
  }
}
