import { Router } from "express";
const router = Router();

import { addNewTag } from "../controllers/tag";

router.post("/new", addNewTag);

export default router;
