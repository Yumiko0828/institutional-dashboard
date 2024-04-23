export interface JwtConfig {
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
}

export default () => ({
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  } as JwtConfig,
});
