// Modules
import { serve } from "./deps.ts";
import { MongoClient } from "./deps.ts";

// Libs
import { handleError } from "./libs/errorHandler.ts";

// Server vars
const port = 8080;

const dbPort = 27017;
const dbHostname = "mongo";
const dbUsername = Deno.env.get("MONGO_INITDB_ROOT_USERNAME");
const dbPassword = Deno.env.get("MONGO_INITDB_ROOT_PASSWORD");

try {
  const dbURI = `mongodb://${dbUsername}:${dbPassword}@${dbHostname}:${dbPort}`;
  const client = new MongoClient();

  console.log(`Connecting to '${dbURI}'`);

  await client.connect(dbURI);

  console.log("Succesfully connected to mongodb");

  const handler = (request: Request): Response => {
    const body = `Your user-agent is:\n\n${
      request.headers.get("user-agent") ?? "Unknown"
    }`;

    return new Response(body, { status: 200 });
  };

  console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
  await serve(handler, { port });
} catch (e: unknown) {
  handleError(e);
}
