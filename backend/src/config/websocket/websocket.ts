import WebSocket from 'ws';
import http from "http";

export interface PeriodicTask {
    handler: (ws: WebSocket, userId: number) => Promise<void>;
    interval: number;
}

export const configureWebSocket = (
    wss: WebSocket.Server,
    periodicTasks: PeriodicTask[]
) => {
    wss.on('connection', (ws: WebSocket, request: http.IncomingMessage, userId: number) => {
        console.debug(`Client connected (userId=${userId})`);

        const intervals = periodicTasks.map(task =>
            setInterval(() => task.handler(ws, userId), task.interval)
        );

        ws.on('close', () => {
            console.debug(`Client disconnected (userId=${userId})`);
            intervals.forEach(clearInterval);
        });
    });
};
