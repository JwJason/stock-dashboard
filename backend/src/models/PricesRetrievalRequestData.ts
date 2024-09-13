import { Request } from "express";
import createHttpError from "http-errors";

export default class PricesRetrievalRequestData {
  constructor(private readonly userId: number) {}

  static createFromRequest(req: Request): PricesRetrievalRequestData {
    const userId = parseInt(req.params.id);

    if (userId === 0) {
      throw new createHttpError.BadRequest("Request userId cannot be null");
    }
    if (userId < 0) {
      throw new createHttpError.BadRequest("Request userId value invalid");
    }

    return new PricesRetrievalRequestData(userId);
  }

  public getUserId(): number {
    return this.userId;
  }
}
