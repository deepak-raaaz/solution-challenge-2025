
import Jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utlis/redis";
import { CatchAsyncError } from "./CatchAsyncError";
import { NextFunction, Request, Response } from "express";
import { AppError, AuthError, ValidationError } from "../utlis/ErrorHandler";


// authenticated user
export const isAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(new ValidationError("Unauthorized! Access token not found!"));
    }

    const decoded = Jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new AuthError("Unauthorized! Invalid access token."));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new AuthError("Unauthorized! User not found!"));
    }

    req.user = JSON.parse(user);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Invalid access token." });
  }

}

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new AppError(
          `Role ${req.user?.role} is not allowed to access this resorce`,
          403
        )
      );
    }
    next();
  };
};