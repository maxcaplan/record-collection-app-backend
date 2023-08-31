import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema/typedefs";
// import { schema } from "./schema";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 2007 },
  });

  console.log(`Server is running at: ${url}`);
}

startApolloServer();
