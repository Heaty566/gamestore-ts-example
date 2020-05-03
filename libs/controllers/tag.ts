import { Request, Response } from "express";
import _ from "lodash";
import { isAdmin } from "../middlewares/isAdmin";
import { isUser } from "../middlewares/isUser";
import { Tag } from "../models/tag";

export const addNewTag = [
  isUser,
  isAdmin,
  async (req: Request, res: Response) => {
    const tagsDB = req.app.get("collections").tags;
    const tag = _.pick(req.body, ["name"]);

    //validate Tag
    const isValid = Tag.validateTag(tag);
    if (!isValid.success) return res.status(400).json(isValid);

    //checking unique
    const isUnique = await Tag.isUnique(isValid.data, tagsDB);
    if (!isUnique.success) return res.status(400).json(isUnique);
    console.log(isUnique);
    res.json("ok");
  },
];
