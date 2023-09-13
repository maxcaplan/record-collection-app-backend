import mongoose from "mongoose";

class Connection {
  constructor() {
    const port = process.env.DB_PORT;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const authSource = process.env.DB_AUTH_SOURCE;

    if (!port) throw new Error("Database port is undefined");
    if (!user) throw new Error("Database user is undefined");
    if (!password) throw new Error("Database password is undefined");
    if (!authSource) throw new Error("Database auth source is undefined");

    const url = encodeURI(
      `mongodb://${user}:${password}@db:${port}/ps?authSource=data`,
    );

    mongoose.connect(url);
  }
}

export default new Connection();
