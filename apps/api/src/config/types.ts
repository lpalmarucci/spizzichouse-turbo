export type ApiConfig = {
  auth: {
    jwt: JwtAuthConfig;
  };
  supabase: SupabaseConfig;
};

export type SupabaseConfig = {
  url: string;
  key: string;
};

export type JwtAuthConfig = {
  secret: string;
  expiresIn: string;
};
