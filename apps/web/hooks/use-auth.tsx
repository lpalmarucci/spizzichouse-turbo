"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const sessionCookie = document.cookie
      .split(";")
      .find((c) => c.split("=")[1]);
    if (sessionCookie) setIsAuth(true);
  }, []);

  return { isAuth };
}
