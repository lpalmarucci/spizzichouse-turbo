import { request } from "graphql-request";

export const gqlRequest = <T>(query: string, variables?: object): Promise<T> =>
  request(process.env.NEXT_PUBLIC_BACKEND_URL!, query, variables);
