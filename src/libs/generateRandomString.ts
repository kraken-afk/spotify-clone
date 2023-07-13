export default function generateRandomString(howMany: number = 43): string {
  if (howMany < 0)
    throw new Error("length of number cannot be negative number");

  const utf8 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~-._";
  let result = "";

  for (let i = 0; i <= howMany; i++)
    result = result.concat(utf8[Math.floor(Math.random() * utf8.length + 1)]);

  return result;
}
