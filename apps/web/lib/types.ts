export type ResponseError = { status: false; error: string };
export type ResponseOk = { status: true };
export type ApiResponse = ResponseOk | ResponseError;

export function isResponseError(obj: unknown): obj is ResponseError {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return "status" in obj && !obj.status;
}
