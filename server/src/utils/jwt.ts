import pkg from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_KEY,
  JWT_REFRESH_EXPIRED,
  JWT_REFRESH_KEY,
} from "../config.js";

interface Payload {
  userId: string;
}

type TokenType = "access" | "refresh";

export function signAsync(payload: Payload, type: TokenType): Promise<string> {
  return new Promise((resolve, reject) => {
    pkg.sign(
      payload,
      type === "access" ? JWT_ACCESS_KEY : JWT_REFRESH_KEY,
      {
        expiresIn: type === "access" ? JWT_ACCESS_EXPIRED : JWT_REFRESH_EXPIRED,
      },
      (e, token) => {
        if (e) return reject(e);

        resolve(token as string);
      }
    );
  });
}

export function verifyAsync(token: string, type: TokenType): Promise<Payload> {
  return new Promise((resolve, reject) => {
    pkg.verify(
      token,
      type === "access" ? JWT_ACCESS_KEY : JWT_REFRESH_KEY,
      (e, pl) => {
        if (e) return reject(e);

        resolve(pl as Payload);
      }
    );
  });
}
