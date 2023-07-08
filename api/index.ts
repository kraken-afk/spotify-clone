export default (req: Request) => {
  const { url } = req;
  const response = new Response(url, {
    headers: {
      "Content-Type": "text/html;charset=utf-8"
    }
  });

  return response;
}