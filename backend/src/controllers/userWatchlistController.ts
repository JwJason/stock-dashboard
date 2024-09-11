import { Request, Response } from 'express';
import UserWatchlistService from "../services/userWatchlistService";
import {getDataSource} from "../config/db/db";

const userWatchlistService = new UserWatchlistService(getDataSource().manager);

export const getUserWatchlist = (req: Request, res: Response): void => {
    const userId = parseInt(req.params.id);
    userWatchlistService.getUserWatchlist(userId).then((userWatchlist) => {
        return res.status(200).json({
            'userWatchlistItems': userWatchlist,
        });
    }).catch((err) => {
        // TODO - Return something & improve error handling
        return res.status(500).json({});
    });
};

export const createUserWatchlistItem = (req: Request, res: Response): void => {
    // TODO - Get userId from auth
    const userId = req.body.userId;
    const stockSymbol = req.body.stockSymbol;
    userWatchlistService.addToUserWatchlist(userId, stockSymbol).then((userWatchlist) => {
        // TODO - Return something
        return res.status(200).json({});
    });
};
