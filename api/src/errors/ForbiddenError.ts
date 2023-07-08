export default class ForbiddenError extends Error {
  statusCode = 403;
  constructor(public message: string) {
    super(message);
  }
}
