import { Express, json } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
  userURL,
  userRouter,
  authURL,
  authRouter,
  tagURL,
  tagRouter,
} from "../routes/";

export const routers = (app: Express) => {
  app.use(json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //main routers
  app.use(userURL, userRouter);
  app.use(authURL, authRouter);
  app.use(tagURL, tagRouter);
};
