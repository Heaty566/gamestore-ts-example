import { Response, Request } from "express";
import moment from "moment";
import _ from "lodash";

import { Token } from "../models/token";
import { User } from "../models/user";

export const loginUser = async (req: Request, res: Response) => {
  const usersDB = req.app.get("collections").users;
  const tokenDB = req.app.get("collections").tokens;

  const user: { username: string; password: string } = _.pick(req.body, [
    "username",
    "password",
  ]);

  //auth user
  const isAuth = await User.authUser(user, usersDB);
  if (!isAuth.success) return res.status(400).json(isAuth);

  //create token
  const token = new Token(isAuth.data, moment());

  //active token
  const response = await token.activeToken(tokenDB, 86400);
  if (!response.success) return res.status(503).json(response);

  //response success
  res.status(400).json(response);
};
