import { ApiConfig } from './types';

export default (): ApiConfig => ({
  auth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL!,
    },
    jwt: {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES_IN!,
    },
  },
  supabase: {
    key: process.env.SUPABASE_KEY!,
    url: process.env.SUPABASE_URL!,
  },
  database: {
    name: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
  },
  frontendUrl: process.env.FRONTEND_URL!,
  redirectAfterSignInUrl: `${process.env.FRONTEND_URL!}/auth/callback`,
  redirectSignInUrl: `${process.env.FRONTEND_URL!}/auth/signin`,
});
