import WebSocket from 'ws';
import  {watchlistService} from "../services/watchlistService";
import http from "http";
import {stockPriceService} from "../services/stockPriceService";
import WebSocketMessageClientData from "../models/WebSocketMessageClientData";

/**
 * Sends stock price data for all stocks in the user's watchlist
 */
export const handlePriceUpdateInterval = async (ws: WebSocket, request: http.IncomingMessage) => {
    try {
        const clientData = WebSocketMessageClientData.createFromIncomingMessage(request);
        const userWatchlist = await watchlistService.getWatchlist(clientData.getUserId());
        const stockPrices = await stockPriceService.getStockPrices(userWatchlist);
        ws.send(JSON.stringify({ 'prices': stockPrices }));
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            ws.send(JSON.stringify({ 'error': err.message }))
        } else {
            ws.send(JSON.stringify({ 'error': 'An unknown error occurred' }))
        }
    }
}
