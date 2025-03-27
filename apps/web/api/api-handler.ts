"use server";

import { getAxiosInstance } from "@/api/axios";
import { AxiosRequestConfig } from "axios";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function handleRequest<T>(
  method: AxiosRequestConfig["method"],
  endpoint: string,
  body?: Object,
) {
  const { sessionId, redirectToSignIn } = await auth();
  const axios = await getAxiosInstance();
  try {
    const response = await axios<T>({
      method,
      data: body,
      url: endpoint,
    });
    return response.data;
  } catch (e) {
    if (sessionId) {
      await clerkClient.sessions.revokeSession(sessionId);
      redirectToSignIn();
    }
  }
}
