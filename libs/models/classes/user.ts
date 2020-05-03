import bcryptjs from "bcryptjs";
import mongodb from "mongodb";
import jwt from "jsonwebtoken";

//*----------------------------------------
// role = 1: customer
// role = 9: admin
/*---------------------------------------- */

export abstract class UserCLass {
  constructor(
    public fullName: string,
    public username: string,
    protected password: string,
    public email: string,
    public phone: string,
    protected role: number = 1
  ) {}

  //  abstract registerNewUser: void;
  protected async hashingPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(14);

    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  }

  static getToken(obj: {
    [props: string]: any;
    _id: mongodb.ObjectID;
  }): string {
    return jwt.sign(obj, "secretKey");
  }
}
