import Joi from "@hapi/joi";

import { SpeciesInterface } from "../../models/interfaces/speciesInterface";
import { formatError } from "./validatorErrorFormat";

const schemasTagValidate = (type: keyof SpeciesInterface) => {
  switch (type) {
    case "name":
      return Joi.string()
        .trim()
        .lowercase()
        .max(30)
        .min(2)
        .regex(/^[a-zA-Z- ]*$/)
        .required()
        .messages({
          "string.base": formatError("Name", "string.base"),
          "string.empty": formatError("Name", "string.empty"),
          "string.min": formatError("Name", "string.min", " two characters"),
          "string.max": formatError("Name", "string.max", " 30 characters"),
          "string.pattern.base": formatError(
            "Name",
            "string.pattern.base",
            "string.letterOnly"
          ),
          "any.required": formatError("Name", "any.required"),
        });
  }
};

export const validateNewTag = <T>(tag: T) => {
  const schema = Joi.object({
    name: schemasTagValidate("name"),
  });

  return schema.validate(tag);
};

export const updateOneTag = validateNewTag;
