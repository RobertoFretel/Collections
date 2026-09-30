import { serve } from "bun";
import index from "./index.html";
import { Elysia } from "elysia"
import { yoga } from "@elysia/graphql-yoga";
import SchemaBuilder from "@pothos/core";
import { COLLECTIONS } from "./lib/collections";

const builder = new SchemaBuilder({})
builder.queryType({});
COLLECTIONS.forEach(c => c.register(builder))

const api = new Elysia({ prefix: "api" })
  .use(yoga({ schema: builder.toSchema() }))

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/api/*": api.fetch
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
