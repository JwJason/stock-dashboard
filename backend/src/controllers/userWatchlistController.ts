import { Request, Response } from "express";
import { watchlistService } from "../services/watchlistService";
import { handleError } from "../handlers/errorHandler";
import WatchlistItemCreationRequestData from "../models/WatchlistItemCreationRequestData";
import WatchlistItemRetrievalRequestData from "../models/WatchlistItemRetrievalRequestData";

export const getWatchlistItems = (req: Request, res: Response) => {
  try {
    const requestData =
      WatchlistItemRetrievalRequestData.createFromRequest(req);
    watchlistService
      .getWatchlist(requestData.getUserId())
      .then((watchlist) => {
        return res.status(200).json({
          watchlistItems: watchlist,
        });
      })
      .catch((err) => {
        return handleError(err, res);
      });
  } catch (err) {
    return handleError(err, res);
  }
};

export const createWatchlistItem = (req: Request, res: Response) => {
  try {
    const requestData = WatchlistItemCreationRequestData.createFromRequest(req);
    watchlistService
      .addToWatchlist(requestData.getUserId(), requestData.getStockSymbol())
      .then((watchlist) => {
        return res.status(201).json({
          watchlistItems: watchlist,
        });
      })
      .catch((err) => {
        return handleError(err, res);
      });
  } catch (err) {
    return handleError(err, res);
  }
};
