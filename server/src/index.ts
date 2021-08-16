import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
// import path from "path";
import { __prod__ } from "./constants";


const main = async () => {
    console.log(process.env, "yoo")

   await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        // migrations: [path.join(__dirname, "./migrations/*")],
        // entities: [Post, User],
      });

  const app = express();
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({});

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(" server started on localhost:4000");
  });


}

main().catch((err) => {
    console.error("Error starting Server", err);
  });