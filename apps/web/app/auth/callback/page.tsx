import { GoogleAuthCallback } from "@/features/auth/components/google-auth-callback";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<span>Error google auth</span>}>
      <GoogleAuthCallback />
    </Suspense>
  );
}
