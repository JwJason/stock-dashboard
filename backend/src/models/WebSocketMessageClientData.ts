import http from "http";
import url from "node:url";

export default class WebSocketMessageClientData {
    constructor(private readonly userId: number) { }

    static createFromIncomingMessage(message: http.IncomingMessage): WebSocketMessageClientData {
        const { query } = url.parse(message.url!, true);
        const userId = parseInt(query.userId as string);

        if (userId === 0) {
            throw new Error('Websocket client userId cannot be null');
        }
        if (userId < 0) {
            throw new Error('Websocket client userId value invalid');
        }

        return new WebSocketMessageClientData(userId);
    }

    public getUserId(): number {
        return this.userId;
    }
}
