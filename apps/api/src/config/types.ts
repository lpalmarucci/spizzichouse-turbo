export type ApiConfig = {
  auth: {
    google: GoogleAuthConfig;
    jwt: JwtAuthConfig;
  };
  supabase: SupabaseConfig;
  database: DatabaseConfig;
  frontendUrl: string;
  redirectAfterSignInUrl: string;
  redirectSignInUrl: string;
};

export type SupabaseConfig = {
  url: string;
  key: string;
};

export type GoogleAuthConfig = {
  clientID: string;
  clientSecret: string;
  callbackUrl: string;
};

export type JwtAuthConfig = {
  secret: string;
  expiresIn: string;
};

export type DatabaseConfig = {
  name: string;
  user: string;
  password: string;
};
