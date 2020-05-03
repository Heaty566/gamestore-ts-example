import moment, { Moment } from "moment";
import mongodb = require("mongodb");
import jwt from "jsonwebtoken";

import { ResponseInterface } from "./interfaces/responseInterface";
import { logger } from "../app/logging";
import { Collection } from "mongodb";

export class Token {
  constructor(private token: string, public expired: Moment) {}

  async activeToken(
    tokenCollection: Collection,
    time: number
  ): Promise<ResponseInterface<string>> {
    const newToken: { token: string; expired: Moment } = {
      token: this.token,
      expired: this.expired.add(time, "seconds"),
    };

    const insertToken = await tokenCollection.insertOne(newToken);
    if (!insertToken) {
      logger.error("Inserting token failed");
      return { success: false, msg: "Server is unavailable", data: "" };
    }

    const tokenId = insertToken.insertedId;
    return { success: true, data: tokenId, msg: "Token is active" };
  }

  static decodeToken(token: string): ResponseInterface<any> {
    try {
      const decode = jwt.verify(token, "secretKey");
      return { success: true, data: decode, msg: "Decode token successfully" };
    } catch (ex) {
      return { success: false, data: "", msg: "Decode token failed" };
    }
  }

  static async getToken(
    token: mongodb.ObjectID,
    tokenCollection: Collection
  ): Promise<ResponseInterface<string>> {
    const findToken = await tokenCollection.findOne({
      _id: token,
    });
    if (!findToken) return { success: false, data: "", msg: "Invalid Token" };

    //checking token is valid
    if (moment(findToken.expired).diff(moment(), "seconds") < 1) {
      await tokenCollection.deleteOne({ _id: token });
      return { success: false, data: "", msg: "Invalid Token" };
    }

    return {
      success: true,
      data: findToken.token,
      msg: "Getting token success",
    };
  }
}
