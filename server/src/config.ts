import { config } from "dotenv";
config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY as string;
export const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY as string;
export const JWT_ACCESS_EXPIRED = 60 * 15; // 15min;
export const JWT_REFRESH_EXPIRED = 60 * 60; // 1 h;
