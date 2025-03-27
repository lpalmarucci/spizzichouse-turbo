import { useQuery } from "@tanstack/react-query";
import { getUserInfo, UserInfo } from "@/features/auth/auth.actions";

export const AUTH_QUERY_KEY = "auth";

export function useGetUserInfo() {
  return useQuery<UserInfo>({
    queryKey: [AUTH_QUERY_KEY],
    queryFn: () => getUserInfo(),
  });
}
