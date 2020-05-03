import helmet from "helmet";
import compression from "compression";

import { Express } from "express";

export const production = (app: Express) => {
  app.use(helmet());
  app.use(compression());
};
