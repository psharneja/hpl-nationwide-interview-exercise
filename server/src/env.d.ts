declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    CORS_ORIGIN: string;
    PORT: string;
  }
}