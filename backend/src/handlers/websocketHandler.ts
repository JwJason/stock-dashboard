import WebSocket from 'ws';

export const handlePriceUpdateInterval = async (ws: WebSocket) => {
    ws.send(JSON.stringify({
        symbol: 'SPY',
        price: Math.floor(Math.random() * 100),
    }));
}
