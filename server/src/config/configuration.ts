export interface JwtConfig {
  ACCESS_SECRET: string;
  ACCESS_EXPIRES: number;
  REFRESH_SECRET: string;
  REFRESH_EXPIRES: number;
}

export default () => ({
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    ACCESS_EXPIRES: 15 * 60,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    REFRESH_EXPIRES: 60 * 60,
  } as JwtConfig,
});
