import { Request } from "express";
import createHttpError from "http-errors";

export default class WatchlistItemCreationRequestData {
  constructor(
    private readonly userId: number,
    private readonly stockSymbol: string,
  ) {}

  static createFromRequest(req: Request): WatchlistItemCreationRequestData {
    const userId = parseInt(req.params.id);
    const stockSymbol = req.body.stockSymbol;

    if (userId === 0) {
      throw new createHttpError.BadRequest("Request userId cannot be null");
    }
    if (userId < 0) {
      throw new createHttpError.BadRequest("Request userId value invalid");
    }
    if (
      stockSymbol === null ||
      stockSymbol === undefined ||
      stockSymbol.trim() === ""
    ) {
      throw new createHttpError.BadRequest(
        "Request stockSymbol cannot be null",
      );
    }

    return new WatchlistItemCreationRequestData(userId, stockSymbol);
  }

  public getUserId(): number {
    return this.userId;
  }

  public getStockSymbol(): string {
    return this.stockSymbol;
  }
}
