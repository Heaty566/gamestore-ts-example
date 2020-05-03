import { Response, Request } from "express";
import _ from "lodash";

import { User } from "../models/user";
import { NewUserInterface } from "../models/interfaces/userInterface";

export const registerUser = async (req: Request, res: Response) => {
  const { users } = req.app.get("collections");
  const user = _.pick(req.body, [
    "fullName",
    "username",
    "password",
    "confirm",
    "email",
    "phone",
  ]);

  //validate user
  const isValid = User.validateRegisterUser(user);
  if (!isValid.success) return res.status(400).json(isValid);

  //checking unique username
  const isUnique = await User.isUnique(isValid.data, users);
  if (!isUnique.success) return res.status(400).json(isUnique);

  //create new user
  const newUser = new User(isValid.data);

  //insert to data
  const result = await newUser.registerUser(users);
  if (!result.success) return res.status(503).json(result);

  //response success
  res.status(200).json(result);
};
