import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import { __prod__ } from "./utils/constants";
import { Property } from "./entities/Property";
import { Person } from "./entities/Person";
import { PersonResolver } from "./resolvers/person";
import { PropertyResolver } from "./resolvers/property";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: __prod__,
    synchronize: __prod__,
    entities: [Property, Person],
  });
  conn.runMigrations();
  const app = express();
    app.set("trust proxy", 1);
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
    );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PersonResolver, PropertyResolver],
      validate: false,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false});

  app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error("Error starting Server", err);
});
