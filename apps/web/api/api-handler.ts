"use server";

import { getAxiosInstance } from "@/api/axios";
import { AxiosRequestConfig, HttpStatusCode } from "axios";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function handleRequest<T>(
  method: AxiosRequestConfig["method"],
  endpoint: string,
  body?: Object,
) {
  const { sessionId, redirectToSignIn } = await auth();
  const axios = await getAxiosInstance();
  const client = await clerkClient();
  try {
    const response = await axios<T>({
      method,
      data: body,
      url: endpoint,
    });
    return response.data;
  } catch (e: any) {
    if (sessionId && e.response.status === HttpStatusCode.Unauthorized) {
      await client.sessions.revokeSession(sessionId);
      redirectToSignIn();
    }
  }
}
