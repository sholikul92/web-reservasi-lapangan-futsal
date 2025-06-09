namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    MIDTRANS_SERVER_KEY: string;
    MIDTRANS_CLIENT_KEY: string;
    DATABASE_URL: string;
    DIRECT_URL?: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
