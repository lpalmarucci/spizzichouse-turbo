"use server";

import { getAxiosInstance } from "@/api/axios";
import { AxiosRequestConfig, HttpStatusCode } from "axios";
import { redirect } from "next/navigation";

export async function handleRequest<T>(
  method: AxiosRequestConfig["method"],
  endpoint: string,
  body?: Object,
) {
  const axios = await getAxiosInstance();
  try {
    const response = await axios<T>({
      method,
      data: body,
      url: endpoint,
    });

    return response.data;
  } catch (e: any) {
    console.log(e);
    if (e.response.status === HttpStatusCode.Unauthorized) {
      redirect("/");
    }
    return Promise.reject(e);
  }
}
