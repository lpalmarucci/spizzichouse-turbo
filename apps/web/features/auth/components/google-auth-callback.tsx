"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function GoogleAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  return <></>;
}
