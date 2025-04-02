import { ApiConfig } from './types';

export default (): ApiConfig => ({
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES_IN!,
    },
  },
  supabase: {
    key: process.env.SUPABASE_KEY!,
    url: process.env.SUPABASE_URL!,
  },
});
