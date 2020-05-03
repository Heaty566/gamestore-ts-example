import Joi from "@hapi/joi";

import { NewUserInterface } from "../../models/interfaces/userInterface";
import { formatError } from "./validatorErrorFormat";

const schemasUserValidate = (type: keyof NewUserInterface) => {
  //this type guard make sure you always type correct property

  switch (type) {
    case "fullName":
      return Joi.string()
        .max(50)
        .min(2)
        .trim()
        .lowercase()
        .regex(/^[a-zA-Z ]*$/)
        .required()
        .messages({
          "string.base": formatError("FullName", "string.base"),
          "string.empty": formatError("FullName", "string.empty"),
          "string.min": formatError(
            "FullName",
            "string.min",
            " two characters"
          ),
          "string.max": formatError("FullName", "string.max", " 50 characters"),
          "string.pattern.base": formatError(
            "FullName",
            "string.pattern.base",
            "string.letterOnly"
          ),
          "any.required": formatError("FullName", "any.required"),
        });

    case "username":
      return Joi.string()
        .max(50)
        .min(6)
        .trim()
        .lowercase()
        .regex(/^[a-zA-Z0-9]*$/)
        .required()
        .messages({
          "string.base": formatError("Username", "string.base"),
          "string.empty": formatError("Username", "string.empty"),
          "string.min": formatError(
            "Username",
            "string.min",
            " six characters"
          ),
          "string.max": formatError("Username", "string.max", " 50 characters"),
          "string.pattern.base": formatError(
            "Username",
            "string.pattern.base",
            "string.letterAndNumber"
          ),
          "any.required": formatError("Username", "any.required"),
        });

    case "email":
      return Joi.string()
        .max(70)
        .min(6)
        .trim()
        .lowercase()
        .email()
        .regex(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .required()
        .messages({
          "string.base": formatError("Email", "string.base"),
          "string.empty": formatError("Email", "string.empty"),
          "string.min": formatError("Email", "string.min", " six characters"),
          "string.email": formatError("Email", "string.email"),
          "string.max": formatError("Email", "string.max", " 70 characters"),
          "string.pattern.base": formatError(
            "Email",
            "string.pattern.base",
            "string.emailForm"
          ),
          "any.required": formatError("Email", "any.required"),
        });

    case "password":
      return Joi.string()
        .max(32)
        .min(8)
        .trim()
        .regex(/^[a-zA-Z0-9]*$/)
        .required()
        .messages({
          "string.base": formatError("Password", "string.base"),
          "string.empty": formatError("Password", "string.empty"),
          "string.min": formatError(
            "Password",
            "string.min",
            " eight characters"
          ),
          "string.max": formatError("Password", "string.max", " 32 characters"),
          "string.pattern.base": formatError(
            "Password",
            "string.pattern.base",
            "string.letterAndNumber"
          ),
          "any.required": formatError("Password", "any.required"),
        });

    case "confirm":
      return Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .trim()
        .messages({
          "any.only": formatError("Confirm", "string.matchPassword"),
          "any.required": formatError("Confirm", "any.required"),
        });

    case "phone":
      return Joi.string()
        .regex(/^[0-9+]*$/)
        .trim()
        .max(14)
        .min(8)
        .required()
        .messages({
          "string.base": formatError("Phone", "string.base"),
          "string.empty": formatError("Phone", "string.empty"),
          "string.min": formatError("Phone", "string.min", " eight characters"),
          "string.max": formatError(
            "Phone",
            "string.max",
            " fourteen characters"
          ),
          "string.pattern.base": formatError(
            "Phone",
            "string.pattern.base",
            "string.numberOnly"
          ),
          "any.required": formatError("Phone", "any.required"),
        });
  }
};

export const validateRegisterUser = (user: NewUserInterface) => {
  const schema = Joi.object({
    fullName: schemasUserValidate("fullName"),
    username: schemasUserValidate("username"),
    email: schemasUserValidate("email"),
    password: schemasUserValidate("password"),
    confirm: schemasUserValidate("confirm"),
    phone: schemasUserValidate("phone"),
  });

  return schema.validate(user);
};

export const validateLoginUser = (user: {
  username: string;
  password: string;
}) => {
  const schema = Joi.object({
    username: schemasUserValidate("username"),
    password: schemasUserValidate("password"),
  });

  return schema.validate(user);
};
