import { Request, Response } from 'express';
import UserWatchlistService from "../services/userWatchlistService";
import {getDataSource} from "../config/db/db";
import {handleError} from "../handlers/errorHandler";
import CreateUserWatchlistItemRequest from "../models/CreateUserWatchlistItemRequest";

const userWatchlistService = new UserWatchlistService(getDataSource().manager);

export const getUserWatchlist = (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        userWatchlistService.getUserWatchlist(userId).then((userWatchlist) => {
            return res.status(200).json({
                'userWatchlistItems': userWatchlist,
            });
        }).catch((err) => {
            return handleError(err, res);
        });
    } catch (err) {
        return handleError(err, res);
    }
};

export const createUserWatchlistItem = (req: Request, res: Response) => {
    // TODO - Get userId from auth; it's currently defined in the request body
    try {
        const requestData = CreateUserWatchlistItemRequest.createFromRequest(req);
        userWatchlistService.addToUserWatchlist(
            requestData.getUserId(),
            requestData.getStockSymbol()
        ).then((userWatchlist) => {
            return res.status(201).json({
                'userWatchlistItems': userWatchlist,
            });
        }).catch((err) => {
            return handleError(err, res);
        })
    } catch (err) {
        return handleError(err, res);
    }
};
