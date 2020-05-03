import { Router, Request, Response } from "express";

import { loginUser } from "../controllers/auth";
import { isUser } from "../middlewares/isUser";
const router = Router();

router.post("/login", loginUser);

router.get("/test", [isUser], (req: Request, res: Response) => {
  const user = req.app.get("user");

  res.json(user);
});

export default router;
