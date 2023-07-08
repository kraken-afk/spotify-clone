import { API_KEY } from "./constants.ts";
import UnauthorizedError from "./errors/UnauthorizedError.ts";


export function validateKey(key: string) {
  if (key !== API_KEY)
    throw new UnauthorizedError("Unauthorized key");
  else
    return;
}
