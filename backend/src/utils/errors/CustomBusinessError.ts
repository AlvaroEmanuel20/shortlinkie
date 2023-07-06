export default class CustomBusinessError extends Error {
  public readonly context: string;

  constructor(message: string, statusCode: number, context: string) {
    super(message);
    this.context = context;
  }
}
