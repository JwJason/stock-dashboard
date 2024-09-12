import WebSocket from 'ws';
import UserWatchlistService from "../services/userWatchlistService";
import {getDataSource} from "../config/db/db";

export const handlePriceUpdateInterval = async (ws: WebSocket, userId: number) => {
    const userWatchlistService = new UserWatchlistService(getDataSource().manager);
    const userWatchlist = await userWatchlistService.getUserWatchlist(userId);

    const mockedResults = userWatchlist.map(watchlistItem => {
        return {
            symbol: watchlistItem,
            price: Math.floor(Math.random() * 100),
        }
    });

    ws.send(JSON.stringify({ 'prices': mockedResults }));
}
