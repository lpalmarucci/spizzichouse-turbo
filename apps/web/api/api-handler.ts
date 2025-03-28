"use server";

import { getAxiosInstance } from "@/api/axios";
import { AxiosRequestConfig, HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleRequest<T>(
  method: AxiosRequestConfig["method"],
  endpoint: string,
  body?: Object,
) {
  const axios = await getAxiosInstance();
  const cookieStore = await cookies();
  try {
    const response = await axios<T>({
      method,
      data: body,
      url: endpoint,
    });
    return response.data;
  } catch (e: any) {
    if (e.response.status === HttpStatusCode.Unauthorized) {
      cookieStore.delete("session");
      redirect("/");
    }
    return {} as T;
  }
}
