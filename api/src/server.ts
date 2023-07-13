import { MODE } from "./constants.ts";
import BlockOrigin from "./utils/BlockOrigin.ts";
import { validateKey } from "./validator.ts";

export function serve(callable: ServerRoute) {
  return (req: Request) => {
    const origin = new URL(req.url).origin;
    const key = req.headers.get("Authorization") as string;

    try {
      if (MODE !== "development") BlockOrigin.validate(origin);

      validateKey(key?.split(" ")[1]);

      return callable(req);
    } catch (error) {
      if (!("statusCode" in error)) console.error(error);

      const body = {
        status: "fail",
        statusCode: error?.statusCode ?? 500,
        message: error.message,
      };
      const headers = {
        "Content-Type": "application/json",
        "Content-Length": `${JSON.stringify(body).length}`,
      };

      return new Response(JSON.stringify(body), {
        headers,
        status: body.statusCode,
      });
    }
  };
}
