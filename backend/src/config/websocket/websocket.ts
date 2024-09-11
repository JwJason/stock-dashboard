import WebSocket from 'ws';

export interface PeriodicTask {
    handler: (ws: WebSocket) => Promise<void>;
    interval: number;
}

export const configureWebSocket = (wss: WebSocket.Server, periodicTasks: PeriodicTask[]) => {
    wss.on('connection', (ws: WebSocket) => {
        console.debug('Client connected');

        const intervals = periodicTasks.map(task =>
            setInterval(() => task.handler(ws), task.interval)
        );

        ws.on('close', () => {
            console.debug('Client disconnected');
            intervals.forEach(clearInterval);
        });
    });
};
