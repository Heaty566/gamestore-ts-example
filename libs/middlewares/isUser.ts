import { Response, Request, NextFunction } from "express";
import { Token } from "../models/token";
import { User } from "../models/user";
import { ObjectID } from "mongodb";

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokensDB = req.app.get("collections").tokens;
  const usersDB = req.app.get("collections").users;
  const tokenId = req.header("x-auth-token");

  if (!tokenId)
    return res
      .status(401)
      .json({ success: false, msg: "Unauthorized user", data: "" });

  const token = await Token.getToken(new ObjectID(tokenId), tokensDB);
  if (!token.success) return res.status(401).json(token);

  const decodeToken: any = Token.decodeToken(token.data);

  const user = await User.getUserWithId(
    new ObjectID(decodeToken.data._id),
    usersDB
  );
  if (!user.success) return res.status(401).json(user);

  req.app.set("user", user.data);
  next();
};
