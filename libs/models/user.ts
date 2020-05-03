import { Collection, ObjectID } from "mongodb";
import _ from "lodash";

import { UserCLass } from "./classes/user";
import { logger } from "../app/logging";
import bcryptjs from "bcryptjs";

import { validateRegisterUser } from "../utils/validators/user";
import { NewUserInterface, UserInterface } from "./interfaces/userInterface";
import { ResponseInterface } from "./interfaces/responseInterface";

export class User extends UserCLass {
  constructor(user: any) {
    const { fullName, username, password, email, phone } = user;
    super(fullName, username, password, email, phone);
  }

  static async isUnique(
    user: { [props: string]: any; username: string },
    db: Collection
  ): Promise<ResponseInterface<null>> {
    const isUnique = await db.findOne({ username: user.username });
    if (isUnique)
      return { success: false, msg: "Username is existed.", data: null };

    return { success: true, msg: "Username is unique", data: null };
  }

  static async getUserWithId(
    userId: ObjectID,
    usersCollection: Collection
  ): Promise<ResponseInterface<UserInterface>> {
    const user = await usersCollection.findOne({ _id: userId });
    if (!user)
      return {
        success: false,
        data: user,
        msg: "User with the given Id was not found",
      };

    return { success: true, data: user, msg: "Getting user success" };
  }

  static async authUser(
    user: { username: string; password: string },
    usersCollection: Collection
  ): Promise<ResponseInterface<string>> {
    const getUser = await usersCollection.findOne({ username: user.username });
    if (!getUser)
      return {
        success: false,
        msg: "Username or Password is invalid",
        data: "",
      };

    const isCorrectPassword = await bcryptjs.compare(
      user.password,
      getUser.password
    );

    if (!isCorrectPassword)
      return {
        success: false,
        msg: "Username or Password is invalid",
        data: "",
      };

    const token = this.getToken(getUser);

    return { success: true, data: token, msg: "Logging success" };
  }

  static validateRegisterUser(
    user: NewUserInterface
  ): ResponseInterface<NewUserInterface> {
    const { error, value } = validateRegisterUser(user);
    if (error)
      return { success: false, msg: error.details[0].message, data: value };

    return { success: true, msg: "", data: value };
  }

  async registerUser(db: Collection): Promise<ResponseInterface<null>> {
    const user: NewUserInterface = {
      fullName: this.fullName,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      role: this.role,
    };

    //hashing password
    user.password = await this.hashingPassword(user.password);

    const newUser = await db.insertOne(user);
    if (!newUser) {
      logger.error("Inserting new user failed");
      return { success: false, msg: "Register user failed", data: newUser };
    }

    const newUserId = newUser.insertedId;
    logger.info(`A new user has been registered with Id: ${newUserId}`);
    return {
      success: true,
      msg: "User registered successfully",
      data: null,
    };
  }
}
