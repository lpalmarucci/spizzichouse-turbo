"use server";

import { handleRequest } from "@/api/api-handler";

export type UserInfo = {
  sub: string;
  name: string;
  email: string;
};

export async function getUserInfo(): Promise<UserInfo> {
  return handleRequest<UserInfo>("GET", "/me");
}
