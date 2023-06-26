import { MongoClient } from "../deps.ts";

export class Client {
  #mongoClient = new MongoClient();

  async connect(uri: string) {
    console.log(uri);
    if (!uri) throw new Error("DB_URI not found in environment");

    try {
      await this.#mongoClient.connect(uri);
    } catch (err) {
      console.error("Error connecting to MongoDB", err);
      throw err;
    }
  }
}
