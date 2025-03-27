export type ApiConfig = {
  auth: {
    google: GoogleAuthConfig;
    jwt: JwtAuthConfig;
  };
  database: DatabaseConfig;
  frontendUrl: string;
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
