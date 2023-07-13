import { CLIENT_ID, CLIENT_SECRET } from "./src/constants.ts";
import { getAccess } from "./src/getAccess.ts";
import { serve } from "./src/server.ts";

export default serve(async (req: Request) => {
  const credential = await getAccess(CLIENT_ID, CLIENT_SECRET);
  const body = {
    status: "success",
    statusCode: 200,
    data: {...credential, client_id: CLIENT_ID},
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json"
    },
    status: body.statusCode
  });
});
