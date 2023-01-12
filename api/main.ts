import { Server } from "./deps.ts";
import { GraphQLHTTP } from "./deps.ts";
import { makeExecutableSchema } from "./deps.ts";

import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";

const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
          schema,
          graphiql: true,
        })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: 8080,
});

server.listenAndServe();
