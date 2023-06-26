import { GraphQLHTTP, Server } from "./deps.ts";

const port = await Deno.env.get("API_PORT");

const handler = (req: Request) => {
  const { pathname } = new URL(req.url);

  switch (pathname) {
    case "/graphql": {
      // return await GraphQLHTTP<Request>({});
      return new Response("Graphql", { status: 200 });
    }

    default: {
      const body = `Your user-agent is:\n\n${
        req.headers.get("user-agent") ?? "Unknown"
      }`;

      return new Response(body, { status: 200 });
    }
  }
};

const server = new Server({ port, handler });

console.log(`[INFO]: Server listening on http://localhost:${port}`);
server.listenAndServe();
