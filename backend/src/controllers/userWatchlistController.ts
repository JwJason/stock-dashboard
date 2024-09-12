import { Request, Response } from 'express';
import { watchlistService } from "../services/watchlistService";
import { handleError } from "../handlers/errorHandler";
import WatchlistItemCreationRequestData from "../models/WatchlistItemCreationRequestData";

export const getWatchlistItems = (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        watchlistService.getWatchlist(userId).then((watchlist) => {
            return res.status(200).json({
                'watchlistItems': watchlist,
            });
        }).catch((err) => {
            return handleError(err, res);
        });
    } catch (err) {
        return handleError(err, res);
    }
};

export const createWatchlistItem = (req: Request, res: Response) => {
    // TODO - Get userId from auth; it's currently defined in the request params
    try {
        const requestData = WatchlistItemCreationRequestData.createFromRequest(req);
        watchlistService.addToWatchlist(
            requestData.getUserId(),
            requestData.getStockSymbol()
        ).then((watchlist) => {
            return res.status(201).json({
                'watchlistItems': watchlist,
            });
        }).catch((err) => {
            return handleError(err, res);
        })
    } catch (err) {
        return handleError(err, res);
    }
};
