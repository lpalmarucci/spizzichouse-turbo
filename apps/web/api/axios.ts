"use server";

import Axios from "axios";
import { getSession } from "@/lib/auth";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

async function getAxiosInstance() {
  const token = await getSession();

  axios.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axios;
}

export { axios, getAxiosInstance };
