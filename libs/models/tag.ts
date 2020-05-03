import { SpeciesClass } from "./classes/species";
import { TagInterface, NewTagInterface } from "./interfaces/speciesInterface";
import { Collection } from "mongodb";
import { validateNewTag } from "../utils/validators/tag";
import { ResponseInterface } from "../models/interfaces/responseInterface";

export class Tag extends SpeciesClass {
  constructor(tag: TagInterface) {
    super(tag.name);
  }

  static validateTag(tag: TagInterface): ResponseInterface<NewTagInterface> {
    const { error, value } = validateNewTag(tag);
    if (error)
      return { success: false, data: value, msg: error.details[0].message };

    return { success: true, data: value, msg: "" };
  }

  static async isUnique(
    tag: { name: string },
    db: Collection
  ): Promise<ResponseInterface<null>> {
    const isUnique = await db.findOne({ name: tag.name });
    if (isUnique)
      return { success: false, msg: "Tag's name is existed.", data: null };

    return { success: true, msg: "Tag's name is unique", data: null };
  }
}
