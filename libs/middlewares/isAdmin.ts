import { Response, Request, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.app.get("user");

  if (user.role !== 9)
    return res.status(403).json({ success: false, data: "", msg: "Forbidden" });

  next();
};
