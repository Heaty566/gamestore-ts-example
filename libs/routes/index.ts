import userRouter from "./user";
import authRouter from "./auth";
import tagRouter from "./tag";

const userURL = "/api/user";
const authURL = userURL;
const tagURL = "/api/game/tag";

export { userURL, userRouter, authURL, authRouter, tagURL, tagRouter };
