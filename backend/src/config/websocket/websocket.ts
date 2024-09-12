import WebSocket from 'ws';
import http from "http";

export interface PeriodicTask {
    handler: (ws: WebSocket, request: http.IncomingMessage) => Promise<void>;
    interval: number;
}

export const configureWebSocket = (
    wss: WebSocket.Server,
    periodicTasks: PeriodicTask[]
) => {
    wss.on('connection', (ws: WebSocket, request: http.IncomingMessage) => {
        const scheduledPeriodicTasks = periodicTasks.map(task =>
            setInterval(() => task.handler(ws, request), task.interval)
        );

        ws.on('close', () => {
            scheduledPeriodicTasks.forEach(clearInterval);
        });
    });
};
