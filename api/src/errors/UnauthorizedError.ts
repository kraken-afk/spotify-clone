export default class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(public message: string) {
    super(message);
  }
}
