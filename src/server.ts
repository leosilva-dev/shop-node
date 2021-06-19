require('dotenv/config');

import { errors } from "celebrate";
import express from "express";
import cors from "cors";

import { Knex } from "./database/connection";
import { routes } from "./routes/Routes";

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(routes);

  app.use(errors());

  app.listen(process.env.PORT || 3333);

  console.log(`\n🔥 Server running in http://localhost:${process.env.PORT || 3333} 🔥`);
}

if (process.env.NODE_ENV === 'production') {
  Knex.migrate.latest()
    .then(startServer)
    .catch(console.log);
} else {
  startServer();
}
