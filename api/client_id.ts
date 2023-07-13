import { CLIENT_ID } from "./src/constants.ts";
import { serve } from "./src/server.ts";

export default serve(async (req: Request) => {
  const body = {
    status: "success",
    statusCode: 200,
    data: { client_id: CLIENT_ID },
  };

  return new Response(
    JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
})
