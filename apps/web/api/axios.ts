"use server";

import Axios from "axios";
import { createClient } from "@/utils/supabase/server";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

async function getAxiosInstance() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  axios.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axios;
}

export { axios, getAxiosInstance };
