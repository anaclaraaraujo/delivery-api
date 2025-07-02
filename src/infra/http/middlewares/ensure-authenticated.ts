import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/shared/errors/AppError";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("🔐 Entrou no ensureAuthenticated");

  try {
    const authHeader = request.headers.authorization;
    console.log("Auth Header:", authHeader);

    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}

export { ensureAuthenticated };
