import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
          res.status(403).json({ message: "Invalid token" });
          return;
        }

        req.user = decoded;
        next();
      }
    );
  }
};
