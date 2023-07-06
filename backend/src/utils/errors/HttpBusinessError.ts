export default class HttpBusinessError extends Error {
  public readonly statusCode: number;
  public readonly context: string;

  constructor(message: string, statusCode: number, context: string) {
    super(message);
    this.statusCode = statusCode;
    this.context = context;
  }
}
