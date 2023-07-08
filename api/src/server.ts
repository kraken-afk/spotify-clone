import { MODE } from "./constants.ts";
import BlockOrigin from "./utils/BlockOrigin.ts";

export function serve(callable: ServerRoute) {
  return (req: Request) => {
    const origin = new URL(req.url).origin;

    try {
      if (MODE !== "development") BlockOrigin.validate(origin);

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
