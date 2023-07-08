import { CLIENT_ID, CLIENT_SECRET } from "./src/constants.ts";
import { getAccess } from "./src/getAccess.ts";
import { serve } from "./src/server.ts";
import { validateKey } from "./src/validator.ts";

export default serve(async (req: Request) => {
  const { key } = await req.json();

  validateKey(key);

  const credential = await getAccess(CLIENT_ID, CLIENT_SECRET);
  const body = {
    status: "success",
    statusCode: 200,
    data: credential,
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Content-Lenght": `${JSON.stringify(body).length}`,
    },
    status: body.statusCode
  });
});
