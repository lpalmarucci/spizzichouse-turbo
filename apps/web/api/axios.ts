"use server";

import Axios from "axios";
import { auth } from "@clerk/nextjs/server";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

async function getAxiosInstance() {
  const { getToken } = await auth();

  axios.interceptors.request.use(async (config) => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axios;
}

export { axios, getAxiosInstance };
