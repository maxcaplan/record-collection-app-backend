import { MongoClient, MongoClientOptions } from "mongodb";

class Connection {
  port: string | number;
  user: string;
  pass: string;
  authSource: string;
  connectionUri: string;
  client: MongoClient;

  constructor(
    user: string,
    pass: string,
    port: string | number,
    authSource: string,
    options?: MongoClientOptions,
  ) {
    this.user = user;
    this.pass = pass;
    this.port = port;
    this.authSource = authSource;

    this.connectionUri = this.createConnectionUri(
      this.user,
      this.pass,
      this.port,
      this.authSource,
    );

    this.client = new MongoClient(this.connectionUri, options);
  }

  createConnectionUri(
    user: string,
    pass: string,
    port: string | number,
    authSource: string,
  ) {
    return encodeURI(
      `mongodb://${user}:${pass}@db:${port}/ps?authSource=${authSource}`,
    );
  }
}

export default Connection;
