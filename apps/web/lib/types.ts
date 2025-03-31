export type ResponseError = { error: string };

export function isResponseError(obj: unknown): obj is ResponseError {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return "error" in obj;
}
