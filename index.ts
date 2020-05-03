import express from "express";

import { logger } from "./libs/app/logging";
import { exceptionsLogger } from "./libs/app/logging";
import { mongoDB } from "./libs/app/database";
import { production } from "./libs/app/production";
import { routers } from "./libs/app/routes";
const app = express();

const port = process.env.PORT || 3000;

mongoDB(app);
production(app);
routers(app);
exceptionsLogger();

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
