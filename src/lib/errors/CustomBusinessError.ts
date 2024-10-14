export default class CustomBusinessError extends Error {
  public readonly context: string;

  constructor(message: string, context: string) {
    super(message);
    this.context = context;
  }
}
