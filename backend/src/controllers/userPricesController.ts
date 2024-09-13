import { Request, Response } from "express";
import { watchlistService } from "../services/watchlistService";
import { stockPriceService } from "../services/stockPriceService";
import { handleError } from "../handlers/errorHandler";
import PricesRetrievalRequestData from "../models/PricesRetrievalRequestData";

export const getPrices = (req: Request, res: Response) => {
  const requestData = PricesRetrievalRequestData.createFromRequest(req);
  watchlistService
    .getWatchlist(requestData.getUserId())
    .then((userWatchlist: string[]) => {
      stockPriceService.getStockPrices(userWatchlist).then((stockPrices) => {
        res.status(200).json({ prices: stockPrices });
      });
    })
    .catch((err) => {
      return handleError(err, res);
    });
};
