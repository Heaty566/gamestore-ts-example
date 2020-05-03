import { Collection, MongoClient } from "mongodb";
import mongodbURI from "mongodb-uri";
import { Express } from "express";

import { logger } from "./logging";
import config from "../config/database.json";

const databaseURL =
  process.env.NODE_ENV === "production"
    ? config.dataBaseURL.production
    : config.dataBaseURL.development;

export const mongoDB = (app: Express) => {
  MongoClient.connect(databaseURL, config.dataBaseOptions, (error, result) => {
    if (error)
      return logger.error(`Connect to mongodb failed: ${error.message}`);

    const dbInfo = mongodbURI.parse(databaseURL);
    const db = result.db(dbInfo.database);

    const collections: { [props: string]: Collection } = {
      users: db.collection("users"),
      tokens: db.collection("tokens"),
      tags: db.collection("tags"),
    };

    app.set("collections", collections);

    logger.info(
      `Connect to ${dbInfo.database} database successfully on host: ${dbInfo.hosts[0].host}`
    );
  });
};
