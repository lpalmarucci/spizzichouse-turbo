"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { UserInfo } from "@/features/auth/auth.actions";
import { useGetUserInfo } from "@/features/auth/auth.query";

export type AuthContextType = {
  userInfo?: UserInfo;
  token: string | null;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data } = useGetUserInfo();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const sessionCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.split("=")[0] === "session")
      ?.split("=")[1];
    setToken(sessionCookie);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo: data,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
