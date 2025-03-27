"use client";

import * as React from "react";
import { UserInfo } from "@/features/auth/auth.actions";
import { useGetUserInfo } from "@/features/auth/auth.query";

export type AuthContextType = {
  userInfo?: UserInfo;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data } = useGetUserInfo();

  console.log({ userInfo: data });

  return (
    <AuthContext.Provider
      value={{
        userInfo: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
